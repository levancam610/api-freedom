import {
    GET_LIST_PRODUCT_HOME_SC,
    GET_PRODUCT_HOME_SC
} from 'Constants/actionTypes';
const INIT_STATE = {
    Data: [],
    Select: {},
}
const productReducer = (state = INIT_STATE, action)=>{
    switch (action.type) {
        case GET_LIST_PRODUCT_HOME_SC:
            return {...state, Data: action.payLoad};
        case GET_PRODUCT_HOME_SC:
            return {...state, Select: action.payLoad};
        default:
            return Object.assign({}, state);
    }
}
export default productReducer;