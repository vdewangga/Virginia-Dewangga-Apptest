import axios from '../../util/server';
import * as a from './_const.config';

export const getListContact = () => async dispatch => {
  const config = {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    dispatch({
      type: a.LOADING_GET_LIST_CONTACT,
    });
    const response = await axios('contact', config);
    dispatch({
      type: a.SUCCESS_GET_LIST_CONTACT,
      payload: response?.data?.data,
    });
  } catch (error) {
    dispatch({
      type: a.ERROR_GET_LIST_CONTACT,
    });
  }
};

export const deleteContact = data => async dispatch => {
  const config = {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    dispatch({
      type: a.LOADING_DELETE_CONTACT,
    });
    const response = await axios('contact/' + data.id, config);
    dispatch({
      type: a.SUCCESS_DELETE_CONTACT,
    });
  } catch (error) {
    dispatch({
      type: a.ERROR_DELETE_CONTACT,
    });
  }
};

export const getDetailContact = data => async dispatch => {
  const config = {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    dispatch({
      type: a.LOADING_GET_DETAIL_CONTACT,
    });
    const response = await axios('contact/' + data, config);
    dispatch({
      payload: response?.data?.data,
      type: a.SUCCESS_GET_DETAIL_CONTACT,
    });
  } catch (error) {
    dispatch({
      type: a.ERROR_GET_DETAIL_CONTACT,
    });
  }
};

export const addContact = data => async dispatch => {
  const config = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };
  try {
    dispatch({
      type: a.LOADING_ADD_CONTACT,
    });
    const response = await axios('contact', config);
    dispatch({
      payload: response?.data?.data,
      type: a.SUCCESS_ADD_CONTACT,
    });
  } catch (error) {
    dispatch({
      type: a.ERROR_ADD_CONTACT,
    });
  }
};

export const editContact = data => async dispatch => {
  const config = {
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      firstName: data?.firstName,
      lastName: data?.lastName,
      age: data?.age,
      photo: data?.photo || 'N/A',
    },
  };
  try {
    dispatch({
      type: a.LOADING_EDIT_CONTACT,
    });
    const response = await axios('contact/' + data?.id, config);
    dispatch({
      payload: response?.data?.data,
      type: a.SUCCESS_EDIT_CONTACT,
    });
  } catch (error) {
    dispatch({
      type: a.ERROR_EDIT_CONTACT,
    });
  }
};

export const resetGetDetail = () => dispatch => {
  dispatch({
    type: a.RESET_GET_DETAIL_CONTACT,
  });
};
