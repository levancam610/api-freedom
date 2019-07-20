import {
    LIST_PRODUCT_SUCCESS,
  DELETE_PRODUCT
} from '../../constants/actionTypes';

export const getListProduct = (data) => ({
  type: LIST_PRODUCT_SUCCESS,
  payload: data
});
export const removeProduct = (id) => ({
  type: DELETE_PRODUCT,
  payLoad: {Id: id}
});

