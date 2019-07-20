export function* apiGetListHome() {
    const response = yield fetch("/api/home/slider").then((result) => {
        return result.json();
    }).then((data)=>{
        return data;
    })
    return response;
}