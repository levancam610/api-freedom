import {getDataById, getJsonData, postJsonData, updateRequest, removeById, uploadFile} from "Constants/ultis"
export function* apiGetListProduct(pageSize, currentPage, orderBy, categoryId) {
    const response = yield getJsonData("/api/products/page/"+currentPage+"/pageSize/"+pageSize+"/orderBy/"+orderBy+"/categoryId/"+categoryId)
    return response;
}
export function* apiCreateProduct(name, categoryId, description, price, discount, instock, avatar) {
    const param = JSON.stringify({
        name: name,
        categoryId: categoryId,
        description: description,
        price: price,
        discount: discount,
        instock: instock,
        avatar: avatar
    })
    const response = yield postJsonData("/api/products", param)
    return response;
}
export function* getDataImageProduct(id) {
    const response = yield getJsonData("/api/image/product/"+id)
    return response;
}
export function* apiRemoveImageProduct(imageId) {
    const response = yield removeById("/api/image/"+imageId)
    return response;
}
export function* apiAddImageProduct(productId, url, name) {
    let param = JSON.stringify({
        productId: productId,
        url: url,
        name: name
    })
    const response = yield postJsonData("/api/image/product", param);
    return response;
}
export function* addImage(file) {
    let formData = new FormData();
    formData.append("file", file)
    const response = yield uploadFile("/api/uploadFile", formData);
    return response;
}
