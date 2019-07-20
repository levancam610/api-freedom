import {
    LIST_CATEGORY_SC,
    MODAL_ADD_CATEGORY
} from 'Constants/actionTypes';
const INIT_STATE = {
    CurrentPage: 1,
    selectPageSize: 8,
    orderBy: "CreatedDate",
    TotalItemCount: 0,
    modalOpen: false,
    modalEdit: false,
    isLoading: false,
    Data: [],
    MaxPage: 0,
}
const categoryReducer = (state = INIT_STATE, action)=>{
    switch (action.type) {
        case LIST_CATEGORY_SC:
            let rs = {...state, ...action.payLoad.param, Data: action.payLoad.data};
           return rs;
        case MODAL_ADD_CATEGORY:
            return {...state, modalOpen: !state.modalOpen}
        /*case ADD_ACCOUNT_SC:
            var rs = {...state, modalOpen: false, Data: [action.payLoad, ...state.Data]};
            return rs;
        case DELETE_ACCOUNT_SC:
            var Data = {Data: state.Data.filter(function(elem){return elem.Id != action.payLoad})}
            return Object.assign({}, state, Data);
        case MODAL_OPEN_SC:
            var rs = {...state, modalOpen: !state.modalOpen, listShop: action.payLoad};
            return rs;
        case CLOSE_MODAL_ADD_ACG:
            var rs = {...state, modalOpen: false};
            return rs;
        case CLOSE_MODAL_EDIT_ACCOUNTG:
            return  {...state, modalEdit: false}
        case MODAL_EDIT_SC:
            return {...state, modalEdit: true, editAccount: action.payLoad.accountEdit, listShop: action.payLoad.listShop};*/

        default:
            return Object.assign({}, state);
    }
}
export default categoryReducer;