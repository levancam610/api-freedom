class ProductModel {
    constructor(name,categoryId, description, avatar, price, discount, rate, instock) {
        this.name=name;
        this.categoryId=categoryId;
        this.description = description;
        this.avatar = avatar;
        this.price = price;
        this.discount = discount;
        this.rate = rate;
        this.instock = instock
    }
    add(){
        let sql = `INSERT INTO product(name, categoryId, description, avatar, price, discount, rate, instock, createdDate) \
                   VALUES('${this.name}',${this.categoryId}, '${this.description}','${this.avatar}', ${this.price},${this.discount} ,${this.rate}, ${this.instock}, NOW())`;
        return sql;
    }
    update(prd_id){
        let sql = `UPDATE product SET 
            name='${this.name}',
            categoryId=${this.categoryId},
            description='${this.description}',
            avatar='${this.avatar}',
            price=${this.price},
            discount=${this.discount},
            instock=${this.instock},
            modifiedDate=NOW(),
            rate=${this.rate} WHERE id=${prd_id}`;
        return sql;
    }
    static findById(prd_id) {
        let sql = `SELECT product.id, 
                          product.name,
                          product.categoryId,
                          product.description,
                          product.avatar,
                          product.price,
                          product.discount,
                          product.rate,
                          product.createdDate,
                          product.modifiedDate,
                          product.instock,
                          category.name as categoryName
                    FROM product LEFT JOIN category ON product.categoryId=category.id WHERE product.id = ${prd_id}`;
        return sql;
    }
    static getTotal(categoryId) {
        if(categoryId==0){
            let sql = `SELECT COUNT(*) as total from product`;
            return sql;
        }

        let sql = `SELECT COUNT(*) as total from product where categoryId=${categoryId}`;
        return sql;
    }
    static delete(prd_id) {
        let sql = `DELETE FROM product WHERE id = ${prd_id}`;
        return sql;
    }

    static getList(page, pageSize, orderBy, categoryId) {
        let from = page>1 ? (page-1)*pageSize+1 : 0;
        let to = pageSize;
        let sql;
        if(categoryId==0){
            sql = `SELECT product.id, 
                          product.name,
                          product.categoryId,
                          product.description,
                          product.avatar,
                          product.price,
                          product.discount,
                          product.rate,
                          product.createdDate,
                          product.modifiedDate,
                          product.instock,
                          category.name as categoryName
                          FROM product LEFT JOIN category ON product.categoryId=category.id order By product.${orderBy} DESC LIMIT ${from},${to}`;
        }else{
            sql = `SELECT product.id, 
                          product.name,
                          product.categoryId,
                          product.description,
                          product.avatar,
                          product.price,
                          product.discount,
                          product.rate,
                          product.createdDate,
                          product.modifiedDate,
                          product.instock,
                          category.name as categoryName
                          FROM product LEFT JOIN category ON product.categoryId=category.id where product.categoryId=${categoryId} order By product.${orderBy} DESC LIMIT ${from},${to}`;
        }
        return sql;
    }
    static getListHome(categoryId){
        let sql = `SELECT product.id, 
                          product.name,
                          product.categoryId,
                          product.description,
                          product.avatar,
                          product.price,
                          product.discount,
                          product.rate
                          FROM product`;
        if(categoryId!=0){
            sql = `SELECT product.id, 
                          product.name,
                          product.categoryId,
                          product.description,
                          product.avatar,
                          product.price,
                          product.discount,
                          product.rate
                          FROM product WHERE categoryId = ${categoryId}`;
        }
        return sql;
    }

}
export default ProductModel;
