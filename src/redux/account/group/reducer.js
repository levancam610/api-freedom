import {
    LIST_ACCOUNT_SC,
    DELETE_ACCOUNT_SC,
    MODAL_OPEN_SC,
    ADD_ACCOUNT_SC, MODAL_EDIT_SC,
    CLOSE_MODAL_EDIT_ACCOUNTG,
    CLOSE_MODAL_ADD_ACG
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
    isLoading: false,
    editAccount: {},
    listShop: [],
}
const accountReducer = (state = INIT_STATE, action)=>{
    switch (action.type) {
        /* -- account group ---*/
        case LIST_ACCOUNT_SC:
            return Object.assign({}, state, action.payLoad)
        case ADD_ACCOUNT_SC:
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
            return {...state, modalEdit: true, editAccount: action.payLoad.accountEdit, listShop: action.payLoad.listShop};

        /* -- account list ---*/

        default:
            return Object.assign({}, state);
    }
}
export default accountReducer;