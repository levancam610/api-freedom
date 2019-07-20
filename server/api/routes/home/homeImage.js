import express from "express";
import connection from "../../../database";
import ImageModel from "../../model/ImageModel";

const router = express.Router();
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
module.exports = router;