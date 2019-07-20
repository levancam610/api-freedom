import {
    LIST_PRODUCT_SUCCESS,
    DELETE_PRODUCT,
    MODAL_ADD_PRODUCT,
    PRODUCT_SET_TYPE_LIST,
    LOADING_DATA_PRODUCT,
    LIST_CATEGORY_HEADER_PRODUCT_SC,
    MODAL_IMAGE_PRODUCT_SC, REMOVE_IMAGE_PRODUCT_SC, UPLOAD_IMAGE_PRODUCT_SC
} from '../../constants/actionTypes';


const INIT_STATE = {
    displayMode: "list",
    CurrentPage: 1,
    selectPageSize: 8,
    searchFields: "Name",
    searchTerm: null,
    orderBy: "CreatedDate",
    TotalItemCount: 0,
    modalOpen: false,
    modalEdit: false,
    isLoading: true,
    Data: [],
    Categories: [],
    CategorySelect: 0,
    modalImage: {
        id: 0,
        open: false,
        data: []
    }
}
const productReducer = (state = INIT_STATE, action)=>{
    switch (action.type) {
        case LIST_CATEGORY_HEADER_PRODUCT_SC:
            console.log(action.payLoad)
            return {...state, Categories: action.payLoad}
        case LOADING_DATA_PRODUCT:
            if(typeof action.Payload!="undefined"){
                return {...state, ...action.Payload, isLoading: true}
            }
            return {...state, isLoading: true}
        case LIST_PRODUCT_SUCCESS:
            return {...state, ...action.payLoad, isLoading: false}
        case DELETE_PRODUCT:
            return {
                ...state.data.filter(elem => elem.id != action.payLoad.Id)
            };
        case MODAL_ADD_PRODUCT:
            return Object.assign({}, state, {modalOpen: !state.modalOpen});
        case PRODUCT_SET_TYPE_LIST:
            return {...state, displayMode: action.payLoad};
        case MODAL_IMAGE_PRODUCT_SC:
            if(action.payLoad==null){
                return {...state, modalImage: {id:0, data: [], open: false}}
            }
            return {...state, modalImage: action.payLoad}
        case REMOVE_IMAGE_PRODUCT_SC:
            let arrImg = state.modalImage.data.filter(elem => elem.id != action.payLoad)
            return  {...state, modalImage: {id: state.modalImage.id, open: true, data: arrImg}}
        case UPLOAD_IMAGE_PRODUCT_SC:
            let data = [...state.modalImage.data, {id: action.payLoad.id, url: action.payLoad.url}]
            return  {...state, modalImage: {id: state.modalImage.id, open: true, data: data}}
        default:
            return state;
    }
}
export default productReducer;
