export function* apiGetListHome(categoryId) {
    const response = yield fetch("/api/home/product/category/"+categoryId).then((result) => {
        return result.json();
    }).then((data)=>{
        return data;
    })
    return response;
}
export function* apiFindById(id) {
    const response = yield fetch("/api/home/product/"+id).then((result) => {
        return result.json();
    }).then((data)=>{
        return data;
    })
    return response;
}