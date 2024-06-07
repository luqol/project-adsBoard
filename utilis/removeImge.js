const fs = require('fs');

const removeImage = (file) => {
    fs.unlink(file.path, (err) => {
        if (err) console.error(`Failed to delete file: ${file.path}`, err);
    });
};

module.exports = removeImage;