const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads');
    },
    filename: (req, file, cb) => {
        const [name, ext] = file.originalname.split('.');
        cb(null, `${name}-${Date.now()}.${ext}`);
    }
});

const limits = {
    fileSize: 1*1024*1024, // 1 mb
    files: 5 // limit to 5 files
};

const imageUpload = multer({storage, limits});

module.exports =  imageUpload;