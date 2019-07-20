import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { message } from "antd";
import {
    LIST_ROLE,
    LIST_ROLE_SC, API, DELETE_ROLE, DELETE_ROLE_SC, MODAL_ADD_ROLE
} from '../../constants/actionTypes';

function* getListRole(action) {
    const apiUrl =API+"/api/roles?pageSize="+action.selectPageSize+"&page="+action.currentPage+"&orderBy="+action.orderBy;
    const response = yield fetch(apiUrl)
        .then((result) => {
            return result.json();
        }).then((data)=>{
            return data;
        })
    yield put({type: LIST_ROLE_SC, payLoad: Object.assign({}, response, {selectPageSize: action.selectPageSize, orderBy: action.orderBy, isLoading: true})});
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

function* addAccountGroup(action) {ss
    const apiUrl = API+"/api/account-group/";
    const response = yield fetch(apiUrl, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            Name: action.name,
            Description: action.description,
            ShopId: null
        })
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
function* api() {
    yield takeEvery(LIST_ROLE, getListRole);
    //yield takeEvery(DELETE_ACCOUNT, removeAccountById);
   // yield takeEvery(ADD_ACCOUNT, addAccountGroup)
}
export default function* roleSagas() {
    yield call(api);
}
