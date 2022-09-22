/*
* Action for feature todos
* */

import { HTTP } from './../utils/HTTP';

import {
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_SUCCESS,
  SHOW_LOADER,
  HIDE_LOADER,
  GET_ME_SUCCESS,
  GET_ME_FAILED
} from './../constants/actionTypes';


export function checkSession() {
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      dispatch({
        type: SHOW_LOADER,
      });
      const token = localStorage.getItem('auth');
      if (token) {
        HTTP('get', '/user/session', null, { Authorization: `Bearer ${token}` })
          .then(function (response) {
            console.log("ME RESPONSE =>>>", response)
            dispatch({
              type: GET_ME_SUCCESS,
              data: response.data
            });
            resolve(response.data);
          })
          .catch(error => {
            console.log("ME RESPONSE Error =>>>", error.response)
            reject(error.response);
          })
          .finally(() => {
            dispatch({
              type: HIDE_LOADER,
            });
          })
      } else {
        dispatch({
          type: LOGOUT_SUCCESS,
        });
      }
    });
  };
}


export function login(data) {
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      dispatch({
        type: SHOW_LOADER,
      });
      HTTP('post', '/admin/login', data)
        .then(function (response) {
          console.log("LOGIN ADMIN RESPONSE =>>>", response)
          dispatch({
            type: LOGIN_SUCCESS,
            data: response.data.data ? response.data.data : response.data 
          });
          localStorage.setItem('auth', response.data.data.authToken);
          resolve(response.data.data);
        })
        .catch(error => {
          console.log("LOGIN ADMIN RESPONSE Error =>>>", error)
          dispatch({
            type: LOGIN_FAILED,
          });
          reject(error.response);
        })
        .finally(() => {
          dispatch({
            type: HIDE_LOADER,
          });
        })
    });
  };
}

export function forgotPassword(data) {
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      dispatch({
        type: SHOW_LOADER,
      });
      HTTP('post', '/user/forgot/password', data)
        .then(function (response) {
          console.log("forgot password RESPONSE =>>>", response)
          resolve(response.data);
        })
        .catch(error => {
          console.log("forgot password RESPONSE Error =>>>", error);
          reject(error.response);
        })
        .finally(() => {
          dispatch({
            type: HIDE_LOADER,
          });
        })
    });
  };
}

export function resetPassword(data) {
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      dispatch({
        type: SHOW_LOADER,
      });
      HTTP('post', '/user/reset/password', data)
        .then(function (response) {
          console.log("RESET password RESPONSE =>>>", response)
          resolve(response.data.data);
        })
        .catch(error => {
          console.log("RESET password RESPONSE Error =>>>", error);
          reject(error.response);
        })
        .finally(() => {
          dispatch({
            type: HIDE_LOADER,
          });
        })
    });
  };
}

export function logout(data) {
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      dispatch({
        type: LOGOUT_SUCCESS,
      });
      resolve();
    });
  };
}

