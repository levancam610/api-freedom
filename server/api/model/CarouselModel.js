class CarouselModel {
    constructor(title, description, status, image) {
        this.title=title;
        this.description=description;
        this.image=image;
        this.status = status;
    }
    /* ADMIN */
    add(){
        const sql = `INSERT INTO carousel(title, description, image, status, createdDate) \
                   VALUES('${this.title}', '${this.description}','${this.image}', '${this.status}', NOW())`;
        return sql;
    }
    update(id){
        const sql = `UPDATE category SET 
            title='${this.title}',
            image='${this.image}',
            description='${this.description}',
            status=${this.status},
            modifiedDate=NOW() WHERE id=${id}`;
        return sql;
    }
    static findById(id) {
        const sql = `SELECT * FROM carousel WHERE id = ${id}`;
        return sql;
    }

    static delete(id) {
        const sql = `DELETE FROM carousel WHERE id = ${id}`;
        return sql;
    }
    static getTotal() {
        const sql = `SELECT COUNT(*) AS total FROM carousel`;
        return sql;
    }
    static getList(page, pageSize, orderBy) {
        const from = page>1 ? (page-1)*pageSize+1 : 0;
        const to = pageSize;
        const sql = `SELECT * FROM carousel order By carousel.${orderBy} DESC LIMIT ${from},${to}`;
        return sql;
    }
    static updateStatus(id, status){
        const sql = `UPDATE carousel SET status=${status} WHERE id=${id}`;
        return sql;
    }

    /* HOME */
    static getListByStatus() {
        const sql = `SELECT title, image FROM carousel WHERE status=1`;
        return sql;
    }
}
export default CarouselModel;
