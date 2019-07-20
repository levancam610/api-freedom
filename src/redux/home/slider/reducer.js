import {
    GET_LIST_SLIDER_HOME_SC
} from 'Constants/actionTypes';
const INIT_STATE = {
    Data: []
}
const sliderReducer = (state = INIT_STATE, action)=>{
    switch (action.type) {
        case GET_LIST_SLIDER_HOME_SC:
           return {...state, Data: action.payLoad};
        default:
            return Object.assign({}, state);
    }
}
export default sliderReducer;