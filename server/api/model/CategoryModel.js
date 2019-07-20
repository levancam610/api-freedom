class CategoryModel {
    constructor(name, description, avatar) {
        this.name=name;
        this.avatar=avatar;
        this.description = description;
    }
    add(){
        let sql = `INSERT INTO category(name, description, avatar, createdDate) \
                   VALUES('${this.name}', '${this.description}','${this.avatar}', NOW())`;
        return sql;
    }
    update(id){
        let sql = `UPDATE category SET 
            name='${this.name}',
            avatar='${this.avatar}',
            description='${this.description}',
            modifiedDate=NOW() WHERE id=${id}`;
        return sql;
    }
    static findById(id) {
        let sql = `SELECT * FROM category WHERE id = ${id}`;
        return sql;
    }

    static delete(id) {
        let sql = `DELETE FROM category WHERE id = ${id}`;
        return sql;
    }

    static getList() {
        let sql = "SELECT * FROM category";
        return sql;
    }

    static getListPaging(page, pageSize, orderBy) {
        let from = page>1 ? (page-1)*pageSize+1 : 0;
        let to = pageSize;
        let sql;
            sql = `SELECT * FROM category order By category.${orderBy} DESC LIMIT ${from},${to}`;
        return sql;
    }
    static getTotalProduct(categoryId) {
        let sql = `select SUM(instock) as total from product GROUP BY(categoryId) HAVING categoryId=${categoryId}`;
        return sql;
    }
    static getTotal(){
        let sql = `select COUNT(*) as total from category`;
        return sql;
    }
}
export default CategoryModel;
