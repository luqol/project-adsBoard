const Ad = require('../models/ad.model');
const removeImage = require('../utilis/removeImge');
const getImageFileType = require('../utilis/getImageFileType');
const fs = require('fs');
const path = require('path');

exports.getAll = async (req, res) => {

    try{
        res.json( await Ad.find());
    }
    catch(err) {
        res.status(500).json({ message: err});
    }
};

exports.getById = async (req, res) => {

    try{
        const oneAd = await Ad.findById(req.params.id);
        if (!oneAd) res.status(404).json({message: 'Not found'});
        else res.json(oneAd)
    }
    catch(err) {
        res.status(500).json({message: err});
    }
};

exports.add = async (req, res) => {

    try{
        const {title, description, publicDate, price, localization, seller} = req.body; 
        const fileType = req.file ? await getImageFileType(req.file) : 'unknow';
        if (title && typeof title === 'string' && description && typeof description === 'string' &&
            publicDate && price && localization && seller &&
            ['image/png', 'image/jpeg', 'image/gif'].includes(fileType) ) {

            const newAd = new Ad( {title, description, publicDate, img: req.file.filename, price, localization, seller});
            await newAd.save();
            res.json({message: 'Ok'});
        } else {
            if(req.file) removeImage(req.file);
            res.status(400).json({ message: 'Bad request'});
        }
     }
    catch(err) {
        if(req.file) removeImage(req.file);
        res.status(500).json({message: err})
    }
};

exports.delete = async (req, res) => {
    try{
        const ad = await Ad.findById(req.params.id);
        if (ad) {
            await Ad.deleteOne( {_id: req.params.id});
            res.json({message: 'Ok'});
        } else {
            res.status(404).json({message: 'Not found'});
        }
    }
    catch(err) {
        res.status(500).json({message: err});
    }
};

exports.edit = async (req, res) => {
    try { 
        const {title, description, publicDate, price, localization} = req.body; 
        if (title && typeof title === 'string' && description && typeof description === 'string' &&
            publicDate && price && localization) {
            const ad = await Ad.findById(req.params.id);
            if(ad) {
                const fileType = req.file ? await getImageFileType(req.file) : 'unknow';

                if ( req.file && ['image/png', 'image/jpeg', 'image/gif'].includes(fileType)){
                    fs.unlink(path.join('public/uploads', ad.img ), (err) => {
                        if (err) console.error(`Failed to delete file: ${ad.img}`, err);
                    });
                    await Ad.updateOne( 
                        { _id: req.params.id},
                        { $set: {title, description, publicDate, img: req.file.filename, price, localization}}
                        );
                } else {
                    await Ad.updateOne( 
                        { _id: req.params.id},
                        { $set: {title, description, publicDate, price, localization}}
                        );
                }
                res.json( {message: 'Ok'});
            }
        } else {
            if(req.file) removeImage(req.file);
            res.status(400).json({ message: 'Bad request'});
        }
    }
    catch(err) {
        if(req.file) removeImage(req.file);
        res.status(500).json({ message: err})
    }
};

exports.searchPhrase = async (req, res) => {
    try {
        res.json( await Ad.find( { title: {$regex: req.params.searchPhrase}} ));
    }
    catch(err) {
        res.status(500).json({message: err});
    }
}