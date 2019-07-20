import {
  LIST_ACCOUNT,
    DELETE_ACCOUNT
} from 'Constants/actionTypes';

export const getListAccount = (data) => ({
  type: LIST_ACCOUNT,
  payload: data
});
export const deleteAccount = (id) => ({
  type: DELETE_ACCOUNT,
  payload: id
});

