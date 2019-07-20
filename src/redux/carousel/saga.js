import { all, call, select, put, takeEvery } from 'redux-saga/effects';
import { message } from "antd";
import {apiUpdateStatus,apiGetListCarousel,apiCreateCarousel, apiGetListHome} from "./api";
import {
    LIST_CAROUSEL, LIST_CAROUSEL_HEADER,
    LIST_CAROUSEL_SC,
    LIST_CATEGORY_SC,
    UPDATE_STATUS_CAROUSEL,
    ADD_CAROUSEL

} from 'Constants/actionTypes';
import firebase from "firebase";
import {firebaseConfig} from '../../constants/defaultValues'
import {NotificationManager} from "Components/ReactNotifications";
import {apiGetAllCategory, apiGetListCategory} from "Redux/category/api";

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

function* getCarouselHeader(action) {
    let page = yield select();
    page = page.categoryList.CurrentPage;
    let pageSize = action.pageSize != null ? action.pageSize : (yield select()).categoryList.selectPageSize;
    let orderBy = action.orderBy != null ? action.orderBy : (yield select()).categoryList.orderBy;
    const respone = yield call(apiGetListCarousel, page, pageSize, orderBy)
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
        yield put({type: LIST_CAROUSEL_SC, payLoad:{data: data, param: param}});
    }
}
function* getListCarousel(action) {
    const rs = yield call(apiGetListCarousel, action.page, action.pageSize, action.orderBy)
    if(rs.Success){
        let data = rs.Data;
        let param = {
            CurrentPage: action.page,
            selectPageSize: action.pageSize,
            orderBy: action.orderBy,
            TotalItemCount: rs.TotalItemCount,
            isLoading: false,
            MaxPage: rs.MaxPage,
        }
        yield put({type: LIST_CAROUSEL_SC, payLoad:{data: data, param: param}});
    }
}

function* updateStatus(action) {
    const rs = yield call(apiUpdateStatus, action.id, action.status)
    if(rs.Success){
        NotificationManager.success(
            "Cập nhật status thành công",
            "Thông báo",
            2000,
            null,
            null,
            "filled"
        );
    }
}


function* createCarousel(action) {
    let state = yield select();
    state = state.categoryList;
    let param = action.param;
    if(param.file!=null){
        const urlImage = yield call(uploadAvatar, param.file)
        const response = yield call(apiCreateCarousel   ,
            param.name,
            param.description,
            param.status,
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
            const response2 = yield call(apiGetListCarousel,1 , state.selectPageSize, state.orderBy)
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
                yield put({type: LIST_CAROUSEL_SC, payLoad:{data: data, param: param}});
            }else{
                console.log("loi server");
            }
        }
    }else{
        const response = yield call(apiCreateCarousel,
            param.name,
            param.description,
            param.status,
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
            const response2 = yield call(apiGetListCarousel,1 , state.selectPageSize, state.orderBy)
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
                yield put({type: LIST_CAROUSEL_SC, payLoad:{data: data, param: param}});
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
        .child("images/slider" + file.name)
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
                    resolve(downloadURL);
                });
            }
        );
    })
    return promise;
}

function* api() {
    yield takeEvery(LIST_CAROUSEL, getListCarousel);
    yield takeEvery(UPDATE_STATUS_CAROUSEL, updateStatus);
    yield takeEvery(LIST_CAROUSEL_HEADER, getCarouselHeader);
    yield takeEvery(ADD_CAROUSEL, createCarousel);
}
export default function* carouselSagas() {
    yield call(api);
}
