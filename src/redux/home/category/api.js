export function* apiGetListHome() {
    const response = yield fetch("/api/home/category").then((result) => {
        return result.json();
    }).then((data)=>{
        return data;
    })
    return response;
}