import {getDataById, getJsonData, postJsonData, updateRequest} from "Constants/ultis"
export function* apiGetAllCategory() {
    const response = yield getJsonData("/api/category")
    return response;
}
export function* apiGetListCategory(currentPage, pageSize, orderBy) {
    const response = yield getJsonData("/api/category/page/"+currentPage+"/pageSize/"+pageSize+"/orderBy/"+orderBy)
    return response;
}
export function* apiGetTotalProduct(categoryId) {
    const response = yield getJsonData("/api/category/total/"+categoryId)
    return response;
}
export function* apiCreateCategory(name, description, avatar) {
    const param = JSON.stringify({
        name: name,
        description: description,
        avatar: avatar
    })
    const response = yield postJsonData("/api/category", param)
    return response;
}