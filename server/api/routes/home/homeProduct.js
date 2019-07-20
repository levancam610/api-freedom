import express from "express";
import connection from "../../../database";
import ProductModel from "../../model/ProductModel"
const router = express.Router();

/*router.get('/page/:page/pageSize/:pageSize/orderBy/:orderBy/categoryId/:id', (req, res) =>{
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

})*/
router.get('/category/:categoryId', (req, res) =>{
    let id = req.params.categoryId;
    connection.query(ProductModel.getListHome(id), (err, rows)=>{
        if(!err){
            res.status(200).send({Success: true, Data: rows});
        }else{
            res.status(500).send({Success: false});
        }
    })
})
router.get('/:id', (req, res) =>{
    let id = req.params.id;
    console.log(ProductModel.findById(id));
    connection.query(ProductModel.findById(id), (err, rows)=>{
        if(!err){
            res.status(200).send({Success: true, Data: rows});
        }else{
            res.status(500).send({Success: false});
        }
    })
})
module.exports = router;