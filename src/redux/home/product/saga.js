import {call, takeEvery, put } from 'redux-saga/effects';
import {apiGetListHome, apiFindById} from "./api";
import {
    GET_LIST_PRODUCT_HOME,
    GET_LIST_PRODUCT_HOME_SC,
    GET_PRODUCT_HOME,
    GET_PRODUCT_HOME_SC
} from 'Constants/actionTypes';

/* HOME API */
function* getListHome(action) {
    const rs = yield call(apiGetListHome, action.categoryId)
    if(rs.Success){
        yield put({type: GET_LIST_PRODUCT_HOME_SC, payLoad: rs.Data})
    }
}
function* getProductById(action) {
    const rs = yield call(apiFindById, action.id)
    if(rs.Success){
        yield put({type: GET_PRODUCT_HOME_SC, payLoad: rs.Data[0]})
    }
}

function* api() {
    yield takeEvery(GET_LIST_PRODUCT_HOME, getListHome);
    yield takeEvery(GET_PRODUCT_HOME, getProductById);
}
export default function* productHomeSagas() {
    yield call(api);
}
