import { combineReducers } from 'redux';
import settings from './settings/reducer';
import menu from './menu/reducer';
import authUser from './auth/reducer';
import accountGroup from './account/group/reducer';
import accountList from './account/list/reducer';
import roleList from './roles/reducer';
import productList from './product/reducer';
import categoryList from './category/reducer';
import carouselList from './carousel/reducer';
import slider from './home/slider/reducer';
import category from './home/category/reducer';
import product from './home/product/reducer';


const reducers = combineReducers({
  menu,
  authUser,
  settings,
  accountGroup,
  accountList,
  roleList,
  productList,
  categoryList,
  carouselList,
  slider,
  category,
  product
});
export default reducers;
