import connection from "../../database";
import UserModel from "../model/UserModel";
import express from "express";
const router = express.Router();


router.post('/login', (req, res) =>{
    if(!req.body){
        res.status(400).send({ Success: false, message: 'please provide account' });
    }
    console.log(UserModel.login(req.body.username, req.body.password));
    connection.query(UserModel.login(req.body.username, req.body.password), (err, rows)=>{
        if(!err){
            if(rows[0].num>0){
                res.send({Success: true, message: "login successfully"});
            }

            res.send({Success: false, message: "login failed"});
        }else{
            res.send({Success: false, message: "insert failed"});
        }
    })
})

module.exports = router;