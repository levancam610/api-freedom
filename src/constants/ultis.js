import {API} from "./actionTypes"
/*---- @param: type new Date() ---*/
const token = "Bear "+localStorage.getItem("token");
export const formatDateddmmyyyy = (date) =>{
    var year = date.getFullYear();
    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    return day + "-" + month  + "-" + year;
}

/*--format money VND */
export const formatMoneyVND = (money) =>{
    money = money.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
    return money.replace("₫", "VND");
}

/*--- get data by id ---*/
export function* getDataById(url){

    const response = yield fetch(url)
        .then((result) => {
            return result.json();
        }).then((data)=>{
            return data;
        })
    return response;
}

/*--- get json data ---*/
export function* getJsonData(url){
    const response = yield fetch(url, {
        headers:{
            'Authorization': token,
        }
    }).then((result) => {
            return result.json();
    }).then((data)=>{
            return data;
    })
    return response;
}

/*-- post json data --*/
export function* postJsonData(url, data){
    const response = yield fetch(url, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token,
        },
        body: data
    })
        .then((result) => {
            return result.json();
        }).then((data)=>{
            return data;
        })
    return response;
}
/*-- upload file --*/
export function* uploadFile(url, data){
    const options = {
        method: 'POST',
        body: data,
        // If you add this, upload won't work
        headers: {
          'Authorization': token,
        }
    };
    const response = yield fetch(url, options)
        .then((result) => {
            return result.json();
        }).then((data)=>{
            return data;
        })
    return response;
}
/*--- delete request ---*/
export function* removeById(url){
    const response = yield fetch(url, {
        method: "DELETE",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token,
        }
    })
        .then((result) => {
            return result.json();
        }).then((data)=>{
            return data;
        })
    return response;
}

/*--- update request ---*/
export function* updateRequest(url, data){
    const response = yield fetch(url, {
        method: "PUT",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: data,
    })
        .then((result) => {
            return result.json();
        }).then((data)=>{
            return data;
        })
    return response;
}

/*--- update patch request ---*/
export function* updatePatch(url, data){
    const response = yield fetch(url, {
        method: "PATCH",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token,
        },
        body: data,
    })
        .then((result) => {
            return result.json();
        }).then((data)=>{
            return data;
        })
    return response;
}


/* API HOME */

/*--- get json data ---*/
export function* getJsonDataHome(url){
    const response = yield fetch(url).then((result) => {
        return result.json();
    }).then((data)=>{
        return data;
    })
    return response;

}
export function* getJsonData2(url){
    const response = yield fetch(url)
        .then((result) => {
        return result.json();
    }).then((data)=>{
        return data;
    })
    return response;
}