import express from "express";
import cloudinary from "../../cloudinaryConfig"
const router = express.Router();
const formidable = require('express-formidable');
router.use(formidable());
router.post('/', (req, res) => {
    let file = req.files.file.path;
    cloudinary.uploader.upload(file, function(error, result) {
        if(!error){
            res.status(200).send({Success: true, message: "upload successfully", url: result.url, name: result.public_id});
        }else{
            res.status(500).send({Success: true, message: "error"});
        }
    });
})
module.exports = router