const multer = require("multer")
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/post_images')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = path.parse(file.originalname).name + "-" + Date.now() + path.extname(file.originalname)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const upload = multer({
    storage: storage
});

module.exports.upload = upload;