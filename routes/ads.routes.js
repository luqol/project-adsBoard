const express = require('express');
const router = express.Router();
const AdsController = require('../controllers/ads.controller');
const authMiddleware = require('../utilis/authMiddleware');
const imageUpload = require('../utilis/imageUpload');



//getAll
router.get('/ads', AdsController.getAll );

//getById
router.get('/ads/:id', AdsController.getById );

//add
router.post('/ads', authMiddleware, imageUpload.single('img'), AdsController.add );

//delete
router.delete('/ads/:id', authMiddleware, AdsController.delete );

//edit
router.put('/ads/:id', authMiddleware, imageUpload.single('img'), AdsController.edit );

//searchedPhrase
router.get('/ads/search/:searchPhrase', AdsController.searchPhrase );


module.exports = router;
