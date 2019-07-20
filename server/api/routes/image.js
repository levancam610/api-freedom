import express from "express";
import connection from "../../database";
import ImageModel from "../model/ImageModel";
import cloudinary from "../../cloudinaryConfig"
const router = express.Router();

router.delete('/delete/:name', (req, res, next) => {
    let name = req.params.name;
    cloudinary.uploader.destroy(name, function(error,result) {
        if(!error){
            res.status(200).send({Success: true, message: "delete successfully"});
        }else{
            res.status(500).send({Success: false, message: "error"});
        }
    });
})
router.post('/product', (req, res) =>{
    if(!req.body){
        res.status(400).send({ success: false, message: 'please provide product' });
    }
    connection.query(ImageModel.addImageProduct(req.body.productId, req.body.url, req.body.name), (err, result)=>{
        if(!err){
            res.send({Success: true, message: "insert successfully", id: result.insertId});
        }else{
            res.send({Success: false, message: "insert failed"});
        }
    })
})

router.get('/product/:id', (req, res) =>{
    let product_id = req.params.id;
    if(!product_id){
        res.status(400).send({ Success: false, message: 'Please provide product_id' });
    }
    connection.query(ImageModel.findImageById(product_id),(err, rows)=>{
        if(!err){
            res.status(200).send({Success: true, Data: rows});
        }else{
            res.status(500).send({Success: false, message: "server error"});
        }
    })
})
router.delete('/:id', (req, res) =>{
    let image_id = req.params.id;
    if(!image_id){
        res.status(400).send({ Success: false, message: 'Please provide image_id' });
    }
    let name = "";
    connection.query(ImageModel.findImageById(image_id),(err, rows)=>{
        if(!err){
            if(typeof rows[0]!="undefined"){
                name = rows[0].name
                console.log("22222222222222");
            }else{
                res.status(500).send({Success: false, message: "id not exist"});
            }
            connection.query(ImageModel.removeImage(image_id),(err)=>{
                if(!err){
                    cloudinary.uploader.destroy(name, function(error) {
                        if(!error){
                            res.status(200).send({Success: true, message: "delete successfully"});
                        }
                        res.status(500).send({Success: false, message: "error"});

                    });
                }else{
                    res.status(500).send({Success: false, message: "image_id not exist"});
                }
            })
        }
    })
})
module.exports = router;