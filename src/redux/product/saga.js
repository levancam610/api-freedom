import { all, call, fork, put, takeEvery, select } from 'redux-saga/effects';
import {
	LIST_ACCOUNT_SCL, LOADING_DATA_PRODUCT,
	LIST_PRODUCT,
	LIST_PRODUCT_SUCCESS, OPEN_LOADING_ACCOUNTL,
	PRODUCT_SET_TYPE_LIST,
	UPLOAD_AVATAR_PRODUCT,
	LIST_CATEGORY_HEADER_PRODUCT,
	LIST_CATEGORY_HEADER_PRODUCT_SC,
	ADD_PRODUCT,
	ADD_PRODUCT_SC,
	MODAL_IMAGE_PRODUCT,
	MODAL_IMAGE_PRODUCT_SC,
	REMOVE_IMAGE_PRODUCT,
	REMOVE_IMAGE_PRODUCT_SC,
	UPLOAD_IMAGE_PRODUCT_SC,
	UPLOAD_IMAGE_PRODUCT
} from '../../constants/actionTypes';

import {  NotificationManager} from "Components/ReactNotifications";
import  firebase  from "firebase";
import {apiGetAllCategory } from "../category/api"

import {apiGetListProduct, apiCreateProduct, getDataImageProduct,apiRemoveImageProduct,apiAddImageProduct, addImage} from "./api"
const config = {
	apiKey: "AIzaSyD634xUquHDI7VftKFS_o8gKH8pvsJ3FLI",
	authDomain: "shopcode-cd861.firebaseapp.com",
	databaseURL: "https://shopcode-cd861.firebaseio.com",
	projectId: "shopcode-cd861",
	storageBucket: "shopcode-cd861.appspot.com",
	messagingSenderId: "387176100957"
};
if (!firebase.apps.length) {
	firebase.initializeApp(config);
}

function* createProduct(action) {
	//const [rs1, rs2] = yield [call(apiGetListProduct, 6969), call(apiGetListProduct, 6868)]
	let state = yield select();
	state = state.productList;
	let param = action.param;
	if(param.price.trim()==""){
		param.price=0
	}
	if(param.discount.trim()==""){
		param.discount=0
	}
	if(param.number.trim()==""){
		param.number=0
	}
	if(param.file!=null){
		const image = yield call(addImage, param.file);
		const response = yield call(apiCreateProduct,
			param.name,
			param.category,
			param.description,
			param.price,
			param.discount,
			param.number,
			image.url,
		)
		if(response.Success){
			NotificationManager.success(
				"Thêm sản phẩm thành công",
				"Thông báo",
				2000,
				null,
				null,
				"filled"
			);
			yield put ({type: LOADING_DATA_PRODUCT, payLoad: {modalOpen: false}})
			const response = yield call(apiGetListProduct, state.selectPageSize, 1, state.orderBy, state.CategorySelect)
			if(response.Success){
				yield put({type: LIST_PRODUCT_SUCCESS, payLoad: Object.assign({}, response, {CategorySelect: state.CategorySelect, selectPageSize: state.selectPageSize, orderBy: state.orderBy, isLoading: true})});
			}else{
				yield put({type: LIST_ACCOUNT_SCL, payLoad: Object.assign({}, {Data: []})});
			}
		}
	}else{
		const response = yield call(apiCreateProduct,
			param.name,
			param.category,
			param.description,
			param.price,
			param.discount,
			param.number,
			"",
		)
		if(response.Success){
			NotificationManager.success(
			"Thêm sản phẩm thành công",
			"Thông báo",
			2000,
			null,
			null,
			"filled"
		);
			yield put ({type: LOADING_DATA_PRODUCT, payLoad: {modalOpen: false}})
			const response = yield call(apiGetListProduct, state.selectPageSize, 1, state.orderBy, state.CategorySelect)
			if(response.Success){
				yield put({type: LIST_PRODUCT_SUCCESS, payLoad: Object.assign({}, response, {CategorySelect: state.CategorySelect, selectPageSize: state.selectPageSize, orderBy: state.orderBy, isLoading: true, modalOpen: false})});
			}else{
				yield put({type: LIST_ACCOUNT_SCL, payLoad: Object.assign({}, {Data: []})});
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
		.child("images/product" + file.name)
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
function* getDataModalImage(action) {
	let state = yield select();
	state = state.productList;
	if(state.modalImage.open==true){
		yield put({type: MODAL_IMAGE_PRODUCT_SC, payLoad: null});
	}
	else{
		const response = yield call(getDataImageProduct, action.id);
		if(response.Success){
			let data = {
				open: true,
				id: action.id,
				data: response.Data
			}
			yield put({type: MODAL_IMAGE_PRODUCT_SC, payLoad: data});
		}
	}
}

function* getCategoryHeader() {
	const response = yield call(apiGetAllCategory);
	if(response.Success){
		yield put({type: LIST_CATEGORY_HEADER_PRODUCT_SC, payLoad: response.Data});
	}
}
function* getListProduct(action) {
	yield put ({type: LOADING_DATA_PRODUCT})
	const response = yield call(apiGetListProduct, action.selectPageSize, action.currentPage, action.orderBy, action.categoryId)
	if(response.Success){
		yield put({type: LIST_PRODUCT_SUCCESS, payLoad: Object.assign({}, response, {CategorySelect: action.categoryId, selectPageSize: action.selectPageSize, orderBy: action.orderBy, isLoading: true})});
	}else{
		yield put({type: LIST_ACCOUNT_SCL, payLoad: Object.assign({}, {Data: []})});
	}
}
function* removeImageProduct(action) {
	const response = yield call(apiRemoveImageProduct, action.id)
	if(response.Success){
		NotificationManager.success(
			"Xóa thành công",
			"Thông báo",
			1500,
			null,
			null,
			"filled"
		);
		yield put({type: REMOVE_IMAGE_PRODUCT_SC, payLoad: action.id});
	}else{
		NotificationManager.error(
			"Lỗi không xóa được",
			"Thông báo",
			1500,
			null,
			null,
			"filled"
		);
	}
}
function* addImageProduct(action) {
	let state = yield select();
	state = state.productList;
	const image = yield call(addImage, action.file);
	const response = yield call(apiAddImageProduct, state.modalImage.id, image.url, image.name);
	if(response.Success){
		NotificationManager.success(
			"Thêm thành công",
			"Thông báo",
			1500,
			null,
			null,
			"filled"
		);
		let param = {
			id: response.id,
			url: image.url
		}
		yield put({type:UPLOAD_IMAGE_PRODUCT_SC, payLoad: param});
	}else{
		NotificationManager.error(
			"Lỗi server",
			"Thông báo",
			1500,
			null,
			null,
			"filled"
		);
	}
}

function* api() {
	yield takeEvery(LIST_PRODUCT, getListProduct);
	yield takeEvery(ADD_PRODUCT, createProduct);
	yield takeEvery(LIST_CATEGORY_HEADER_PRODUCT, getCategoryHeader);
	yield takeEvery(MODAL_IMAGE_PRODUCT, getDataModalImage);
	yield takeEvery(REMOVE_IMAGE_PRODUCT, removeImageProduct);
	yield takeEvery(UPLOAD_IMAGE_PRODUCT, addImageProduct);


}
export default function* productListSagas() {
	yield call(api);
}
