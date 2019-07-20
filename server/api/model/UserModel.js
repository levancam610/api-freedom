class CategoryModel {
    constructor(name, username, password, role, phone) {
        this.name=name;
        this.username=username;
        this.password = password;
        this.role = role;
        this.phone = phone;
    }
    static login(username, password){
        let sql = `select count(*) as num, role from user where username='${username}' and password='${password}' group by role`;
        return sql;
    }
    add(){
        let createDate = new Date().getTime();
        let sql = `INSERT INTO category(name, parentId, description, createdDate) \
                   VALUES('${this.name}',${this.parentId}, '${this.description}', NOW())`;
        return sql;
    }
    update(id){
        let sql = `UPDATE category SET 
            name='${this.name}',
            parentId=${this.parentId},
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
}
export default CategoryModel;
