import { all, call, select, put, takeEvery } from 'redux-saga/effects';
import { message } from "antd";
import {apiGetListCategory,apiCreateCategory} from "./api";
import {
    ADD_CATEGORY,
    LIST_ACCOUNT_SCL,
    LIST_CATEGORY, LIST_CATEGORY_HEADER,
    LIST_CATEGORY_SC

} from 'Constants/actionTypes';
import firebase from "firebase";
import {firebaseConfig} from '../../constants/defaultValues'
import {NotificationManager} from "Components/ReactNotifications";

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}


function* getListCategory(action) {
    const respone = yield call(apiGetListCategory, action.page, action.pageSize, action.orderBy)
    if(respone.Success){
        let data = respone.Data;
        let param = {
            CurrentPage: action.page,
            selectPageSize: action.pageSize,
            orderBy: action.orderBy,
            TotalItemCount: respone.TotalItemCount,
            isLoading: false,
            MaxPage: respone.MaxPage,
        }
        yield put({type: LIST_CATEGORY_SC, payLoad:{data: data, param: param}});
    }
}
function* getListCategoryHeader(action) {
    let page = yield select();
    page = page.categoryList.CurrentPage;
    let pageSize = action.pageSize != null ? action.pageSize : (yield select()).categoryList.selectPageSize;
    let orderBy = action.orderBy != null ? action.orderBy : (yield select()).categoryList.orderBy;
    const respone = yield call(apiGetListCategory, page, pageSize, orderBy)
    if(respone.Success){
        let data = respone.Data;
        let param = {
            CurrentPage: page,
            selectPageSize: pageSize,
            orderBy: orderBy,
            TotalItemCount: respone.TotalItemCount,
            isLoading: false,
            MaxPage: respone.MaxPage,
        }
        yield put({type: LIST_CATEGORY_SC, payLoad:{data: data, param: param}});
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

function* createCategory(action) {
    let state = yield select();
    state = state.categoryList;
    let param = action.param;
    if(param.file!=null){
        const urlImage = yield call(uploadAvatar, param.file)
        const response = yield call(apiCreateCategory   ,
            param.name,
            param.description,
            urlImage,
        )
        if(response.Success){
            NotificationManager.success(
                "Thêm danh mục thành công",
                "Thông báo",
                2000,
                null,
                null,
                "filled"
            );
            const response2 = yield call(apiGetListCategory,1 , state.selectPageSize, state.orderBy)
            let data = response2.Data;
            let param = {
                CurrentPage: 1,
                selectPageSize: state.selectPageSize,
                orderBy: state.orderBy,
                TotalItemCount: response2.TotalItemCount,
                isLoading: false,
                MaxPage: response2.MaxPage,
                modalOpen: false
            }
            if(response2.Success){
                yield put({type: LIST_CATEGORY_SC, payLoad:{data: data, param: param}});
            }else{
                console.log("loi server");
            }
        }
    }else{
        const response = yield call(apiCreateCategory,
            param.name,
            param.description,
            "",
        )
        if(response.Success){
            NotificationManager.success(
                "Thêm danh mục thành công",
                "Thông báo",
                2000,
                null,
                null,
                "filled"
            );
            console.log(state);
            const response2 = yield call(apiGetListCategory,1 , state.selectPageSize, state.orderBy)
            let data = response2.Data;
            let param = {
                CurrentPage: 1,
                selectPageSize: state.selectPageSize,
                orderBy: state.orderBy,
                TotalItemCount: response2.TotalItemCount,
                isLoading: false,
                MaxPage: response2.MaxPage,
                modalOpen: false
            }
            if(response2.Success){
                yield put({type: LIST_CATEGORY_SC, payLoad:{data: data, param: param}});
            }else{
                console.log("loi server");
            }
        }
    }
}
function uploadAvatar(files) {
    var file = files
    var metadata = {
        contentType: "image/*"
    };
    var storageRef = firebase.storage().ref();
    var uploadTask = storageRef
        .child("images/category/" + file.name)
        .put(file, metadata);
    let promise = new Promise(function (resolve,reject) {
        uploadTask.on(
            firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
            function(snapshot) {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + progress + "% done");
                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED: // or 'paused'
                        console.log("Upload is paused");
                        break;
                    case firebase.storage.TaskState.RUNNING: // or 'running'
                        console.log("Upload is running");
                        break;
                }
            },
            function(error) {
                reject(error);
            },
            function() {
                uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                    console.log("dow xong roi ne" +downloadURL)
                    resolve(downloadURL);
                });
                console.log(uploadTask.snapshot.ref.fullPath);
            }
        );
    })
    return promise;

}
function* api() {
    yield takeEvery(LIST_CATEGORY, getListCategory);
    yield takeEvery(LIST_CATEGORY_HEADER, getListCategoryHeader);
    yield takeEvery(ADD_CATEGORY, createCategory);
 /*   yield takeEvery(DELETE_ACCOUNT, removeAccountById);
    yield takeEvery(ADD_ACCOUNT, addAccountGroup)
    yield takeEvery(MODAL_EDIT, openModalEdit)
    yield takeEvery(MODAL_OPEN, openModalAdd)
    yield takeEvery(UPDATE_ACCOUNT, updateAccount)*/
}
export default function* categorySagas() {
    yield call(api);
}
