import { combineReducers } from 'redux';
import slider from './home/slider/reducer';
import settings from './settings/reducer';
import authUser from './auth/reducer';
import menu from './menu/reducer';
import category from './home/category/reducer';
import product from './home/product/reducer';
const homeReducers = combineReducers({
    settings,
    authUser,
    menu,
    category,
    slider,
    product
});
export default homeReducers;
