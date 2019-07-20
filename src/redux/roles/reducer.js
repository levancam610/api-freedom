import {
    LIST_ROLE_SC,
    DELETE_ROLE_SC,
    MODAL_ADD_ROLE
} from '../../constants/actionTypes';
const INIT_STATE = {
    CurrentPage: 1,
    selectPageSize: 8,
    searchFields: "Name",
    searchTerm: null,
    orderBy: "Name",
    TotalItemCount: 0,
    modalOpen: false,
    isLoading: false

}
const roleReducer = (state = INIT_STATE, action)=>{
    switch (action.type) {
        case LIST_ROLE_SC:
            return Object.assign({}, state, action.payLoad)
        break;
        case DELETE_ROLE_SC:
            console.log(action);
            let Data = {Data: state.Data.filter(function(elem){return elem.Id != action.payLoad})}
            return Object.assign({}, state, Data);
            break;
        case MODAL_ADD_ROLE:
            let modalOpen = {modalOpen: !state.modalOpen};
            return Object.assign({}, state, modalOpen)
            break;
        default:
            return Object.assign({}, state);
    }
}
export default roleReducer;