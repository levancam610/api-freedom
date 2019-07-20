import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { message } from "antd";
import {getDataById, getJsonData, postJsonData, updateRequest} from "Constants/ultis"
import {
    API,
    LIST_ACCOUNTL,
    LIST_ACCOUNT_SCL,
    LOADING_DATA_PRODUCT

} from 'Constants/actionTypes';

import {intl} from "react-intl";

function* getListAccount(action) {
    const messages = action.intl.messages;
    yield put ({type: LOADING_DATA_PRODUCT})
    const response = yield getJsonData("/api/accounts?pageSize="+action.selectPageSize+"&page="+action.currentPage+"&orderBy="+action.orderBy+"&fetch=true&descending=true")
    if(response.Success){
        yield put({type: LIST_ACCOUNT_SCL, payLoad: Object.assign({}, response, {selectPageSize: action.selectPageSize, orderBy: action.orderBy, isLoading: true})});
    }else{
        message.error(messages["server.error"]);
        yield put({type: LIST_ACCOUNT_SCL, payLoad: Object.assign({}, {Data: []})});
    }
}


function* openModalAdd() {
    const apiUrl =API+"/api/shops"
    const response = yield fetch(apiUrl)
        .then((result) => {
            return result.json();
        }).then((data)=>{
            return data;
        })
    if(response.Success){
        yield put({type: MODAL_OPEN_SC, payLoad: response.Data});
    }else{
        message.error("Server error. Please contact the administrator");
    }
}
/*
function* openModalEdit(action) {
    const response = yield getJsonData("/api/shops");
    const accountEdit = yield getDataById("/api/account-group/"+action.id+"?fetch=true");
    if(response.Success && accountEdit.Success){
        yield put({type: CLOSE_MODAL_EDIT_ACCOUNTG})
        yield put({type: MODAL_EDIT_SC, payLoad: {accountEdit: accountEdit.Data, listShop: response.Data}});
    }

}

function* updateAccount(action) {
    const response = yield updateRequest("/api/account-group", JSON.stringify({
        Id: action.id,
        Name: action.name,
        Description: action.desc,
        ShopId: action.shopId,
        CreatedDate: action.createDate,
        ModifiedDate: new Date().toISOString()

    }));
    if(response.Success){
        message.success("Update successfully");
        yield put({type: CLOSE_MODAL_EDIT_ACCOUNTG})
        yield put({type: LIST_ACCOUNT, selectPageSize: action.selectPageSize, currentPage: action.currentPage, orderBy: action.orderBy});
    }
}
function* removeAccountById(action) {
    const apiUrl =API+"/api/account-group/"+action.id;
    const response = yield fetch(apiUrl, {
        method: "DELETE",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    })
     .then((result) => {
        return result.json();
     }).then((data)=>{
        return data;
     })
    if(typeof response.Success != "undefined" && response.Success){
        yield put({type: DELETE_ACCOUNT_SC, payLoad: action.id});
        message.success('Delete successfully');
    }else{
        message.error("Cannot delete this account");
    }
}


function* addAccountGroup(action) {
    const response = yield postJsonData("/api/account-group",
        JSON.stringify({
            Name: action.name,
            Description: action.description,
            ShopId: action.shopId,
            CreatedDate: new Date().toISOString(),
            ModifiedDate: new Date().toISOString()
    }))
    if(response.Success){
        yield put({type: CLOSE_MODAL_ADD_ACG})
        yield put({type: LIST_ACCOUNT, selectPageSize: action.pageSize, currentPage: action.currentPage, orderBy: action.orderBy});
        message.success('Add successfully');
    }else{
        message.error("Cannot Add account");
    }
}*/
function* api() {
    yield takeEvery(LIST_ACCOUNTL, getListAccount);
   /* yield takeEvery(DELETE_ACCOUNT, removeAccountById);
    yield takeEvery(ADD_ACCOUNT, addAccountGroup)
    yield takeEvery(MODAL_EDIT, openModalEdit)
    yield takeEvery(MODAL_OPEN, openModalAdd)
    yield takeEvery(UPDATE_ACCOUNT, updateAccount)*/
}
export default function* accountListSagas() {
    yield call(api);
}
