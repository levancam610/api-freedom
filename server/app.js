import express from "express";
import bodyParser from 'body-parser';
import cors from "cors";
import productRoutes from './api/routes/product';
import CategoryRoutes from './api/routes/category';
import ImageRoutes from './api/routes/image';
import CarouselRoutes from './api/routes/carousel';

import HomeCarouselRoutes from './api/routes/home/homeCarousel';
import HomeProducRoutes from './api/routes/home/homeProduct';
import HomeCategoryRoutes from './api/routes/home/homeCategory';
import HomeImageRoutes from './api/routes/home/homeImage';
import UploadFile from './api/routes/uploadFile';

import jwt from 'jsonwebtoken';
import UserModel from "./api/model/UserModel";
import connection from "./database";
const app = express();

app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})
/* check token */
const serect = "camhoi123camhoi123";
let checkToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
    if( typeof token=="undefined"){
        return res.json({
            success: false,
            message: 'Please provide token'
        });
    }

    console.log(token);
    token = token.split(" ")[1];
    console.log(token);
    if (token) {
        jwt.verify(token, serect, (err, decoded) => {
            if (err) {
                return res.json({
                    success: false,
                    message: 'Token is not valid'
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.json({
            success: false,
            message: 'Auth token is not supplied'
        });
    }
};

////////////


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
//app.use(express.static('./dist'));
app.post('/api/login', (req, res) =>{
    if(!req.body){
        res.status(400).send({ Success: false, message: 'please provide account' });
    }
    connection.query(UserModel.login(req.body.username, req.body.password), (err, rows)=>{
        if(!err){
            console.log(rows);
            if(typeof rows[0]!="undefined" && rows[0].num>0){
                let token = null;
                if(rows[0].role=="admin"){
                    token = jwt.sign({username: req.body.username }, serect, { expiresIn: 129600 }); // Sigining the token 24h;
                }
                res.send({Success: true, message: "login successfully", token: token});
            }else{
                res.send({Success: false, message: "login failed"});
            }
        }else{
            res.send({Success: false, message: "insert failed"});
        }
    })
})
app.use('/api/testImage', function (req, res) {
    res.send({
        name: "camhoi.png",
        status: "done",
        url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
        thumbUrl: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
    });
});
/* API ADMIN */
app.use('/api/products',checkToken, productRoutes);
app.use('/api/category',checkToken, CategoryRoutes);
app.use('/api/image',checkToken, ImageRoutes);
app.use('/api/carousel',checkToken, CarouselRoutes);
app.use('/api/uploadFile',checkToken, UploadFile);

/* API HOME */
app.use('/api/home/slider', HomeCarouselRoutes);
app.use('/api/home/product', HomeProducRoutes);
app.use('/api/home/category', HomeCategoryRoutes);
app.use('/api/home/image', HomeImageRoutes);

module.exports = app;
