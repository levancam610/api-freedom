
import express from "express";
import connection from "../../database";
import ProductModel from "../model/ProductModel";
const router = express.Router();

router.get('/page/:page/pageSize/:pageSize/orderBy/:orderBy/categoryId/:id', (req, res) =>{
    let total = 0;
    let page = req.params.page;
    let pageSize = req.params.pageSize;
    let orderBy = req.params.orderBy;
    let categoryId = req.params.id;
    let maxPage = 0;
    connection.query(ProductModel.getTotal(categoryId), (err, rows)=>{
        if(!err){
            total = rows[0].total;
            maxPage = total%pageSize == 0 ? total/pageSize : parseInt(total/pageSize) +1;
        }else{
            res.status(500).send({Success: false});
        }
    })
    connection.query(ProductModel.getList(page, pageSize, orderBy, categoryId), (err, rows)=>{
        if(!err){
            res.status(200).send({Success: true, Data: rows, TotalItemCount: total, MaxPage: maxPage, CurrentPage: page});
        }else{
            res.status(500).send({Success: false});
        }
    })

})
router.get('/:id', (req, res) =>{
    let product_id = req.params.id;
    if(!product_id){
        res.status(400).send({ Success: false, message: 'Please provide product_id' });
    }

    connection.query(ProductModel.findById(product_id),(err, rows)=>{
        if(!err){
            res.status(200).send({Success: true, Data: rows[0]});
        }else{
            res.status(500).send({Success: false, message: "not found"});
        }
    })
})
router.post('/', (req, res) =>{
    if(!req.body){
        res.status(400).send({ Success: false, message: 'please provide product' });
    }
    let product = new ProductModel(req.body.name, req.body.categoryId, req.body.description, req.body.avatar, req.body.price, req.body.discount, -1, req.body.instock);
    console.log(product.add());
    connection.query(product.add(), (err)=>{
        if(!err){
            res.send({Success: true, message: "insert successfully"});
        }else{
            res.send({Success: false, message: "insert failed"});
        }
    })
})
router.delete('/:id', (req, res) =>{
    let product_id = req.params.id;
    if(!product_id){
        res.status(400).send({ Success: false, message: 'Please provide product_id' });
    }

    connection.query(ProductModel.delete(product_id),(err)=>{
        if(!err){
            res.status(200).send({Success: true, message: "delete successfully"});
        }else{
            res.status(500).send({Success: false, message: "product_id not exist"});
        }
    })
})

router.put('/:id', (req, res) =>{
    let product_id = req.params.id;
    if(!product_id){
        res.status(400).send({ Success: false, message: 'Please provide product_id' });
    }
    let product = new ProductModel(req.body.name, req.body.categoryId, req.body.description, req.body.avatar, req.body.price, req.body.discount, req.body.rate);
    connection.query(product.update(product_id),(err)=>{
        if(!err){
            res.status(200).send({Success: true, message: "update successfully"});
        }else{
            res.status(500).send({Success: false, message: "product_id not exist"});
        }
    })
})


module.exports = router;