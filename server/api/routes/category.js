
import express from "express";
import connection from "../../database";
import CategoryModel from "../model/CategoryModel";
import ProductModel from "../model/ProductModel";
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
router.get('/page/:page/pageSize/:pageSize/orderBy/:orderBy', (req, res) =>{
    let total = 0;
    let page = req.params.page;
    let pageSize = req.params.pageSize;
    let orderBy = req.params.orderBy;
    let maxPage = 0;
    connection.query(CategoryModel.getTotal(), (err, rows)=>{
        if(!err){
            total = rows[0].total;
            maxPage = total%pageSize == 0 ? total/pageSize : parseInt(total/pageSize) +1;
        }else{
            res.status(500).send({Success: false});
        }
    })
    connection.query(CategoryModel.getListPaging(page, pageSize, orderBy), (err, rows)=>{
        let promiseArr = [];
        if(!err){
            for(let i=0 ;i < rows.length>0; i++){
                let promise = new Promise(function (resolve, reject) {
                    let totalProduct = 0;
                    connection.query(CategoryModel.getTotalProduct(rows[i].id),(err, total)=>{
                        if(!err){
                            if(typeof total[0] != "undefined"){
                                totalProduct = total[0].total;
                                resolve({index: i, product: totalProduct});
                            }else{
                                resolve({index: i, product: totalProduct});
                            }
                        }
                    })
                })
                promiseArr.push(promise);
            }
            Promise.all(promiseArr).then(values => {
                for(let i=0; i<values.length; i++){
                    rows[i] = {
                        id: rows[i].id,
                        name: rows[i].name,
                        avatar: rows[i].avatar,
                        description: rows[i].description,
                        createdDate: rows[i].createdDate,
                        totalProduct: values[i].product
                    };
                }
                res.status(200).send({Success: true, Data: rows, TotalItemCount: total, MaxPage: maxPage, CurrentPage: page});
            })
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
router.get('/total/:id', (req, res) =>{
    let id = req.params.id;
    if(!id){
        res.status(400).send({ Success: false, message: 'Please provide category_id' });
    }
    connection.query(CategoryModel.getTotalProduct(id),(err, rows)=>{
        if(!err){
            if(typeof rows[0] != "undefined"){
                res.status(200).send({Success: true, Total: rows[0].total});
            }else{
                res.status(200).send({Success: true, Total: 0});
            }
        }else{
            res.status(500).send({Success: false, message: "not found"});
        }
    })
})
router.post('/', (req, res) =>{
    if(!req.body){
        res.status(400).send({ Success: false, message: 'please provide category' });
    }
    let category = new CategoryModel(req.body.name, req.body.description, req.body.avatar);
    console.log(category.add())
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
    console.log(category.update(id));
    connection.query(category.update(id),(err)=>{
        if(!err){
            res.status(200).send({Success: true, message: "update successfully"});
        }else{
            res.status(500).send({Success: false, message: "category_id not exist"});
        }
    })
})

module.exports = router;