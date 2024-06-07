const User = require('../models/user.model');
const Session = require('../models/Session.model');
const bcrypt = require('bcryptjs');
const getImageFileType = require('../utilis/getImageFileType');
const removeImage = require('../utilis/removeImge');


exports.register = async (req, res) => {
    try {
        const {login, password,  mobile} = req.body;
        const fileType = req.file ? await getImageFileType(req.file) : 'unknow';
        
        if ( login && typeof login ==='string' && password && typeof password === 'string' && req.file && mobile && 
            ['image/png', 'image/jpeg', 'image/gif'].includes(fileType) ) {

            const userWithLogin = await User.findOne({ login})
            if (userWithLogin) {
                removeImage(req.file);
                return res.status(409).json({ message: 'User with this login already exists'});
            }

            const user = await User.create({login, password: await bcrypt.hash(password, 10), avatar: req.file.filename, mobile});
            res.status(201).json({message: 'User created: ' + user.login});
        } else {
            removeImage(req.file);
            res.status(400).json({ message: 'Bad request'});
        }
    }
    catch(err) {
        removeImage(req.file);
        res.status(500).json({message: err});
    }
};

exports.login = async (req, res) => {
    try {
        const {login, password} = req.body;
        if ( login && typeof login ==='string' && password && typeof password === 'string') {
            const user = await User.findOne( {login});
            if (!user){
                res.status(400).json( {message: 'Login or password are incorrect'});
            } else {
                if (bcrypt.compareSync(password, user.password)) {
                    req.session.user = {
                        id: user.id,
                        login: user.login
                    } ;
                    res.status(200).json( {message: 'Login successful'});
                } else {
                    res.status(400).json({message: 'Login or password are incorrect'});
                }
            }

        } else {
            res.status(400).json({ message: 'Bad request'});
        }
    }
    catch(err) {
        res.status(500).json({message: err});
    }
};

exports.getUserInfo = async (req, res) => {
    try {
        if ( req.session.user) {
            res.send({ login: req.session.user.login});
        } else {
            res.send({messgae: 'There is no session'});
        }
        
    }
    catch(err) {
        res.status(500).json({message: err});
    }
};

exports.logout = async (req, res) => {
    try {
        if (process.env.NODE_ENV !== "production") {
            await Session.deleteMany({});
        }
        const login = req.session.user.login;
    
        req.session.destroy((err) => {
            if (err) {
                console.log(err);
                return next(err);
            }
            res.status(200).json({ message: ` ${login} Logout successful` });
        });
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
}