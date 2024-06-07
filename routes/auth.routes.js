const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth.controller');
const authMiddleware = require('../utilis/authMiddleware');
const imageUpload = require('../utilis/imageUpload');


//register new user
router.post('/register', imageUpload.single('avatar'), auth.register);

//login 
router.post('/login', auth.login);

//get user info
router.get('/user', authMiddleware, auth.getUserInfo);

//logout
router.delete('/logout', authMiddleware, auth.logout);

module.exports = router;