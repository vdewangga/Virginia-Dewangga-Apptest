import * as a from '../actions/_const.config';

export const initialState = {
  list_contact: [],
  detail_contact: {},
  SUCCESS_GET_LIST_CONTACT: false,
  LOADING_GET_LIST_CONTACT: false,
  ERROR_GET_LIST_CONTACT: false,
  SUCCESS_GET_DETAIL_CONTACT: false,
  LOADING_GET_DETAIL_CONTACT: false,
  ERROR_GET_DETAIL_CONTACT: false,
  LOADING_DELETE_CONTACT: false,
  SUCCESS_DELETE_CONTACT: false,
  ERROR_DELETE_CONTACT: false,
  LOADING_EDIT_CONTACT: false,
  SUCCESS_EDIT_CONTACT: false,
  ERROR_EDIT_CONTACT: false,
  LOADING_ADD_CONTACT: false,
  ERROR_ADD_CONTACT: false,
  SUCCESS_ADD_CONTACT: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case a.LOADING_GET_LIST_CONTACT:
      return {
        ...state,
        list_contact: [],
        SUCCESS_GET_LIST_CONTACT: false,
        LOADING_GET_LIST_CONTACT: true,
        ERROR_GET_LIST_CONTACT: false,
      };
    case a.SUCCESS_GET_LIST_CONTACT:
      return {
        ...state,
        list_contact: [...action.payload],
        SUCCESS_GET_LIST_CONTACT: true,
        LOADING_GET_LIST_CONTACT: false,
        ERROR_GET_LIST_CONTACT: false,
      };
    case a.ERROR_GET_LIST_CONTACT:
      return {
        ...state,
        list_contact: [],
        SUCCESS_GET_LIST_CONTACT: false,
        LOADING_GET_LIST_CONTACT: false,
        ERROR_GET_LIST_CONTACT: true,
      };
    case a.LOADING_GET_DETAIL_CONTACT:
      return {
        ...state,
        detail_contact: {},
        SUCCESS_GET_DETAIL_CONTACT: false,
        LOADING_GET_DETAIL_CONTACT: true,
        ERROR_GET_DETAIL_CONTACT: false,
      };
    case a.SUCCESS_GET_DETAIL_CONTACT:
      return {
        ...state,
        detail_contact: {...action.payload},
        SUCCESS_GET_DETAIL_CONTACT: true,
        LOADING_GET_DETAIL_CONTACT: false,
        ERROR_GET_DETAIL_CONTACT: false,
      };
    case a.ERROR_GET_DETAIL_CONTACT:
      return {
        ...state,
        detail_contact: {},
        SUCCESS_GET_DETAIL_CONTACT: false,
        LOADING_GET_DETAIL_CONTACT: false,
        ERROR_GET_DETAIL_CONTACT: true,
      };
    case a.LOADING_DELETE_CONTACT:
      return {
        ...state,
        LOADING_DELETE_CONTACT: true,
        SUCCESS_DELETE_CONTACT: false,
        ERROR_DELETE_CONTACT: false,
      };
    case a.SUCCESS_DELETE_CONTACT:
      return {
        ...state,
        LOADING_DELETE_CONTACT: false,
        SUCCESS_DELETE_CONTACT: true,
        ERROR_DELETE_CONTACT: false,
      };
    case a.ERROR_DELETE_CONTACT:
      return {
        ...state,
        LOADING_DELETE_CONTACT: false,
        SUCCESS_DELETE_CONTACT: false,
        ERROR_DELETE_CONTACT: true,
      };
    case a.LOADING_ADD_CONTACT:
      return {
        ...state,
        LOADING_ADD_CONTACT: true,
        SUCCESS_ADD_CONTACT: false,
        ERROR_ADD_CONTACT: false,
      };
    case a.SUCCESS_ADD_CONTACT:
      return {
        ...state,
        LOADING_ADD_CONTACT: false,
        SUCCESS_ADD_CONTACT: true,
        ERROR_ADD_CONTACT: false,
      };
    case a.ERROR_ADD_CONTACT:
      return {
        ...state,
        LOADING_ADD_CONTACT: false,
        SUCCESS_ADD_CONTACT: false,
        ERROR_ADD_CONTACT: true,
      };
    case a.LOADING_EDIT_CONTACT:
      return {
        ...state,
        LOADING_EDIT_CONTACT: true,
        SUCCESS_EDIT_CONTACT: false,
        ERROR_EDIT_CONTACT: false,
      };
    case a.SUCCESS_EDIT_CONTACT:
      return {
        ...state,
        LOADING_EDIT_CONTACT: false,
        SUCCESS_EDIT_CONTACT: true,
        ERROR_EDIT_CONTACT: false,
      };
    case a.ERROR_EDIT_CONTACT:
      return {
        ...state,
        LOADING_EDIT_CONTACT: false,
        SUCCESS_EDIT_CONTACT: false,
        ERROR_EDIT_CONTACT: true,
      };
    case a.RESET_GET_DETAIL_CONTACT:
      return {
        ...state,
        detail_contact: {},
        SUCCESS_GET_DETAIL_CONTACT: false,
        LOADING_GET_DETAIL_CONTACT: false,
        ERROR_GET_DETAIL_CONTACT: false,
      };
    default:
      return state;
  }
};
