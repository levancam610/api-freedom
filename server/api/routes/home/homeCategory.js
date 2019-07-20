import express from "express";
import connection from "../../../database";
import CategoryModel from "../../model/CategoryModel";
const router = express.Router();

router.get('/', (req, res) =>{
    connection.query(CategoryModel.getList(), (err, rows)=>{
        if(!err){
            res.status(200).send({Success: true, Data: rows});
        }else{
            res.status(500).send({Success: false});
        }
    })
})
module.exports = router;