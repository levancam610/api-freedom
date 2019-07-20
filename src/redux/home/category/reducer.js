import {
    GET_LIST_CATEGORY_HOME_SC
} from 'Constants/actionTypes';
const INIT_STATE = {
    Data: []
}
const categoryReducer = (state = INIT_STATE, action)=>{
    switch (action.type) {
        case GET_LIST_CATEGORY_HOME_SC:
           return {...state, Data: action.payLoad};
        default:
            return Object.assign({}, state);
    }
}
export default categoryReducer;