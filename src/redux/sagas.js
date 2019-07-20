import { all, fork } from 'redux-saga/effects';
import accountGroupSagas from './account/group/saga';
import accountListSagas from './account/list/saga';
import productListSagas from './product/saga';
import authSagas from './auth/saga';
import roleSagas from './roles/saga';
import categorySagas from './category/saga';
import carouselSagas from './carousel/saga';
import sliderHomeSagas from './home/slider/saga';
import categoryHomeSagas from './home/category/saga';
import productHomeSagas from './home/product/saga'

export default function* rootSagas() {
  yield fork(accountGroupSagas);
  yield fork(accountListSagas);
  yield fork(roleSagas);
  yield fork(authSagas);
  yield fork(productListSagas);
  yield fork(categorySagas);
  yield fork(carouselSagas);

  /* HOME */
  yield fork(categoryHomeSagas);
  yield fork(sliderHomeSagas);
  yield fork(productHomeSagas);
}
