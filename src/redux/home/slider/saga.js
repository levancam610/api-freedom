import {call, takeEvery, put } from 'redux-saga/effects';
import {apiGetListHome} from "./api";
import {
    GET_LIST_SLIDER_HOME,
    GET_LIST_SLIDER_HOME_SC
} from 'Constants/actionTypes';

/* HOME API */
function* getListHome() {
    const rs = yield call(apiGetListHome)
    if(rs.Success){
        yield put({type: GET_LIST_SLIDER_HOME_SC, payLoad: rs.Data})
    }
}


function* api() {
    yield takeEvery(GET_LIST_SLIDER_HOME, getListHome);
}
export default function* sliderHomeSagas() {
    yield call(api);
}
