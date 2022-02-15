const multer = require("multer");

const storage = multer.diskStorage({
    // destination: function(req, file, cb){
    //     cb(null, '../../images/');
    // },
    filename: function(req, file, cb){
        const name = Date.now().toString();
        cb(null, name);
    }
});

const upload = multer({ storage: storage }).single('image');

module.exports = upload;