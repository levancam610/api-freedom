import {
    LIST_ACCOUNT_SCL,
    DELETE_ACCOUNT_SCL,
    MODAL_OPEN_ADD_ACCOUNTL_SC,
    OPEN_LOADING_ACCOUNTL,
    ADD_ACCOUNT_SCL, MODAL_EDIT_SCL,
    CLOSE_MODAL_EDIT_ACCOUNTL,
    CLOSE_MODAL_ADD_ACL
} from 'Constants/actionTypes';
const INIT_STATE = {
    CurrentPage: 1,
    selectPageSize: 8,
    searchFields: "Name",
    searchTerm: null,
    orderBy: "CreatedDate",
    TotalItemCount: 0,
    modalOpen: false,
    modalEdit: false,
    isLoading: true,
    editAccount: {},
    listShop: [],

}
const accountReducer = (state = INIT_STATE, action)=>{
    switch (action.type) {
        /* -- account group ---*/

        case OPEN_LOADING_ACCOUNTL:
            return {...state, isLoading: true}
        case LIST_ACCOUNT_SCL:
            return {...state, ...action.payLoad, isLoading: false}
        case ADD_ACCOUNT_SCL:
            var rs = {...state, modalOpen: false, Data: [action.payLoad, ...state.Data]};
            return rs;
        case DELETE_ACCOUNT_SCL:
            var Data = {Data: state.Data.filter(function(elem){return elem.Id != action.payLoad})}
            return Object.assign({}, state, Data);
        case MODAL_OPEN_ADD_ACCOUNTL_SC:
            var rs = {...state, modalOpen: !state.modalOpen, listShop: action.payLoad};
            return rs;
        case CLOSE_MODAL_ADD_ACL:
            var rs = {...state, modalOpen: false};
            return rs;
        case CLOSE_MODAL_EDIT_ACCOUNTL:
            return  {...state, modalEdit: false}
        case MODAL_EDIT_SCL:
            return {...state, modalEdit: true, editAccount: action.payLoad.accountEdit, listShop: action.payLoad.listShop};

        /* -- account list ---*/

        default:
            return Object.assign({}, state);
    }
}
export default accountReducer;