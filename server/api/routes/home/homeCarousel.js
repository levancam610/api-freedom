import express from "express";
import connection from "../../../database";
import CarouselModel from "../../model/CarouselModel";
const router = express.Router();

router.get('/', (req, res) =>{
    connection.query(CarouselModel.getListByStatus(), (err, rows)=>{
        if(!err){
            res.status(200).send({Success: true, Data: rows});
        }else{
            res.status(500).send({Success: false});
        }
    })
})
module.exports = router;