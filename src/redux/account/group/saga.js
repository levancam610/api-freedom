import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { message } from "antd";
import {getDataById, getJsonData, postJsonData, updateRequest} from "Constants/ultis"
import {
    LIST_ACCOUNT,
    LIST_ACCOUNT_SC,
    API,
    DELETE_ACCOUNT,
    DELETE_ACCOUNT_SC,
    ADD_ACCOUNT,
    ADD_ACCOUNT_SC,
    UPDATE_ACCOUNT,
    MODAL_OPEN,
    MODAL_OPEN_SC,
    MODAL_EDIT,
    MODAL_EDIT_SC, CLOSE_MODAL_EDIT_ACCOUNTG,CLOSE_MODAL_ADD_ACG

} from 'Constants/actionTypes';

function* getListAccount(action) {
    const apiUrl =API+"/api/account-group?pageSize="+action.selectPageSize+"&page="+action.currentPage+"&orderBy="+action.orderBy+"&fetch=true&descending=true";
    const response = yield fetch(apiUrl)
        .then((result) => {
            return result.json();
        }).then((data)=>{
            return data;
        })
    yield put({type: LIST_ACCOUNT_SC, payLoad: Object.assign({}, response, {selectPageSize: action.selectPageSize, orderBy: action.orderBy, isLoading: true})});
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
}
function* api() {
    yield takeEvery(LIST_ACCOUNT, getListAccount);
    yield takeEvery(DELETE_ACCOUNT, removeAccountById);
    yield takeEvery(ADD_ACCOUNT, addAccountGroup)
    yield takeEvery(MODAL_EDIT, openModalEdit)
    yield takeEvery(MODAL_OPEN, openModalAdd)
    yield takeEvery(UPDATE_ACCOUNT, updateAccount)
}
export default function* accountGroupSagas() {
    yield call(api);
}
