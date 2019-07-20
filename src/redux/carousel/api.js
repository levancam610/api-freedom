import {getJsonData, postJsonData, updatePatch} from "Constants/ultis"
export function* apiGetListCarousel(page, pageSize, orderBy) {
    const response = yield getJsonData("/api/carousel/page/"+page+"/pageSize/"+pageSize+"/orderBy/"+orderBy)
    return response;
}
export function* apiUpdateStatus(id, status) {
    const param = JSON.stringify({status: status})
    const response = yield updatePatch("/api/carousel/"+id, param)
    return response;
}
export function* apiCreateCarousel(title, description, status, image) {
    const param = JSON.stringify({
        title: title,
        description: description,
        status: status,
        image: image
    })
    const response = yield postJsonData("/api/carousel", param)
    return response;
}
