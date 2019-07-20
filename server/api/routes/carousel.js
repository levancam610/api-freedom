import express from "express";
import connection from "../../database";
import CarouselModel from "../model/CarouselModel";
import CategoryModel from "../model/CategoryModel";
const router = express.Router();

router.get('/page/:page/pageSize/:pageSize/orderBy/:orderBy', (req, res) =>{
    let total = 0;
    let page = req.params.page;
    let pageSize = req.params.pageSize;
    let orderBy = req.params.orderBy;
    let maxPage = 0;
    connection.query(CarouselModel.getTotal(), (err, rows)=>{
        if(!err && typeof rows[0] != "undefined"){
            total = rows[0].total;
            maxPage = total%pageSize == 0 ? total/pageSize : parseInt(total/pageSize) +1;
        }else{
            total = 0;
            maxPage = 0;
        }
    })
    connection.query(CarouselModel.getList(page, pageSize, orderBy), (err, rows)=>{
        if(!err){
            res.status(200).send({Success: true, Data: rows, TotalItemCount: total, MaxPage: maxPage, CurrentPage: page});
        }else{
            res.status(500).send({Success: false});
        }
    })
})
router.get('/:id', (req, res) =>{
    let id = req.params.id;
    if(!id){
        res.status(400).send({ Success: false, message: 'Please provide category_id' });
    }
    connection.query(CategoryModel.findById(id),(err, rows)=>{
        if(!err){
            res.status(200).send({Success: true, Data: rows[0]});
        }else{
            res.status(500).send({Success: false, message: "not found"});
        }
    })
})

router.post('/', (req, res) =>{
    if(!req.body){
        res.status(400).send({ Success: false, message: 'please provide param' });
    }
    let category = new CarouselModel(req.body.title, req.body.description, req.body.status, req.body.image);
    connection.query(category.add(), (err)=>{
        if(!err){
            res.send({Success: true, message: "insert successfully"});
        }else{
            res.send({Success: false, message: "insert failed"});
        }
    })
})
router.delete('/:id', (req, res) =>{
    let id = req.params.id;
    if(!id){
        res.status(400).send({ Success: false, message: 'Please provide category_id' });
    }
    connection.query(CategoryModel.delete(id),(err)=>{
        if(!err){
            res.status(200).send({Success: true, message: "delete successfully"});
        }else{
            res.status(500).send({Success: false, message: "category_id not exist"});
        }
    })
})

router.put('/:id', (req, res) =>{
    let id = req.params.id;
    if(!id){
        res.status(400).send({ Success: false, message: 'Please provide category_id' });
    }
    let category = new CategoryModel(req.body.name, req.body.parentId, req.body.description);
    connection.query(category.update(id),(err)=>{
        if(!err){
            res.status(200).send({Success: true, message: "update successfully"});
        }else{
            res.status(500).send({Success: false, message: "category_id not exist"});
        }
    })
})
router.patch('/:id', (req, res) =>{
    let id = req.params.id;
    if(!id){
        res.status(400).send({ Success: false, message: 'Please provide ID' });
    }
    connection.query(CarouselModel.updateStatus(id, req.body.status),(err)=>{
        if(!err){
            res.status(200).send({Success: true, message: "update status successfully"});
        }else{
            res.status(500).send({Success: false, message: "ID not exist"});
        }
    })
})

module.exports = router;