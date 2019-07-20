class ImageModel {
    constructor(name, url, productId) {
        this.name=name;
        this.url=url;
        this.productId = productId;
    }
    static removeImage(img_id) {
        let sql = `DELETE FROM image WHERE id = ${img_id}`;
        return sql;
    }
    static addImageProduct(prd_id, url, name) {
        let sql = `INSERT INTO image(productId, url, name, createdDate) VALUES (${prd_id}, '${url}','${name}', NOW())`;
        return sql;
    }
    static findImageById(prd_id) {
        let sql = `SELECT id, url FROM image WHERE productId = ${prd_id}`;
        return sql;
    }
}
export default ImageModel;
