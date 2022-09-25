import { HTTP } from '../utils/HTTP';

import {
    ROUTE_GET_SUCCESS,
    SHOW_LOADER,
    HIDE_LOADER,
    ROUTE_EMPTY_SUCCESS,
    ROUTE_DELETE_SUCCESS,
    ROUTE_GET_DETAILS_SUCCESS,
} from '../constants/actionTypes';

export function getAllRoute({ page, limit, searchText }) {

    return function (dispatch) {
        return new Promise(async function (resolve, reject) {
            dispatch({
                type: SHOW_LOADER,
            });
            const token = localStorage.getItem('auth');
            let uri =  `/route/list/?page=${page}&limit=${limit}`;
            if(searchText){
                uri = `${uri}&search=${searchText}`
            }
            HTTP('get',uri, null, { Authorization: `Bearer ${token}` })
                .then(function (response) {
                    console.log("response in  route ==>>", response.data);
                    dispatch({
                        type: ROUTE_GET_SUCCESS,
                        data: response.data
                      });
                    dispatch({
                        type: HIDE_LOADER,
                    });
                    resolve(response.data);
                })
                .catch(error => {
                    console.log("error in  route", error)
                    reject(error);
                    dispatch({
                        type: HIDE_LOADER,
                    });
                })
                .finally(() => {
                    dispatch({
                        type: HIDE_LOADER,
                    });
                })
        });
    };
}

export function getFilterRoute({ page, limit, searchText }) {

    return function (dispatch) {
        return new Promise(async function (resolve, reject) {
            dispatch({
                type: SHOW_LOADER,
            });
            const token = localStorage.getItem('auth');
            let uri =  `/route/list/?page=${page}&limit=${limit}`;
            if(searchText){
                uri = `${uri}&search=${searchText}`
            }
            HTTP('get', uri, null, { Authorization: `Bearer ${token}` })
                .then(function (response) {
                    console.log("response in  buses ==>>", response);
                    dispatch({
                        type: ROUTE_EMPTY_SUCCESS
                      });
                    dispatch({
                        type: ROUTE_GET_SUCCESS,
                        data: response.data
                      });
                    dispatch({
                        type: HIDE_LOADER,
                    });
                    resolve(response.data);
                })
                .catch(error => {
                    console.log("error in  buses", error)
                    reject(error);
                    dispatch({
                        type: HIDE_LOADER,
                    });
                })
                .finally(() => {
                    dispatch({
                        type: HIDE_LOADER,
                    });
                })
        });
    };
}

export function getRouteDetails(id) {

    return function (dispatch) {
        return new Promise(async function (resolve, reject) {
            dispatch({
                type: SHOW_LOADER,
            });
            let token = localStorage.getItem('auth');
            HTTP('get', `/route/details/${id}`, { user_id: id }, { Authorization: `Bearer ${token}` })
                .then(function (response) {
                    console.log("response in  buses ==>>", response);
                    dispatch({
                        type: ROUTE_GET_DETAILS_SUCCESS,
                        data: response.data
                      });
                    dispatch({
                        type: HIDE_LOADER,
                    });
                    resolve(response.data);
                })
                .catch(error => {
                    console.log("error in  buses", error)
                    reject(error);
                    dispatch({
                        type: HIDE_LOADER,
                    });
                })
                .finally(() => {
                    dispatch({
                        type: HIDE_LOADER,
                    });
                })
        });
    };
}

export function deleteRoute(id) {

    return function (dispatch) {
        return new Promise(async function (resolve, reject) {
            dispatch({
                type: SHOW_LOADER,
            });
            const token = localStorage.getItem('auth');
            HTTP('post', `/route/remove/${id}`, null, { Authorization: `Bearer ${token}` })
                .then(function (response) {
                    console.log("response in  buses delete ==>>", response);
                    dispatch({
                        type:ROUTE_DELETE_SUCCESS,
                        data : response.data
                    });
                    dispatch({
                        type: HIDE_LOADER,
                    });
                    resolve(response.data);
                })
                .catch(error => {
                    console.log("error in  buses delete", error)
                    reject(error);
                    dispatch({
                        type: HIDE_LOADER,
                    });
                })
                .finally(() => {
                    dispatch({
                        type: HIDE_LOADER,
                    });
                })
        });
    };
}

export function getUserActivity(id) {

    return function (dispatch) {
        return new Promise(async function (resolve, reject) {
            dispatch({
                type: SHOW_LOADER,
            });
            let token = localStorage.getItem('auth');
            HTTP('get', 'admin/userActivity/' + id, null, { Authorization: `Bearer ${token}` })
                .then(function (response) {
                    console.log("response in  userActivityData ==>>", response)
                    resolve(response.data);
                })
                .catch(error => {
                    console.log("error in  buses", error)
                    reject(error);
                    dispatch({
                        type: HIDE_LOADER,
                    });
                })
                .finally(() => {
                    dispatch({
                        type: HIDE_LOADER,
                    });
                })
        });
    };
}

export function addRoute(data) {
    console.log("add Bus", data);

    return function (dispatch) {
        return new Promise(async function (resolve, reject) {
            dispatch({
                type: SHOW_LOADER,
            });
            let token = localStorage.getItem('auth');
            HTTP('post', `/route/add`, data, { Authorization: `Bearer ${token}`  })
                .then(function (response) {
                    dispatch({
                        type:ROUTE_EMPTY_SUCCESS
                    });
                    dispatch({
                        type: HIDE_LOADER,
                    });
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                    dispatch({
                        type: HIDE_LOADER,
                    });
                })
                .finally(() => {
                    dispatch({
                        type: HIDE_LOADER,
                    });
                })
        });
    };
}

export function updateRoute({id,data}) {
    console.log("update Bus",id, data);

    return function (dispatch) {
        return new Promise(async function (resolve, reject) {
            dispatch({
                type: SHOW_LOADER,
            });
            let token = localStorage.getItem('auth');
            HTTP('post', `/route/update/${id}`, data, { Authorization: `Bearer ${token}` })
                .then(function (response) {
                    dispatch({
                        type:ROUTE_EMPTY_SUCCESS
                    });
                    dispatch({
                        type: HIDE_LOADER,
                    });
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                    dispatch({
                        type: HIDE_LOADER,
                    });
                })
                .finally(() => {
                    dispatch({
                        type: HIDE_LOADER,
                    });
                })
        });
    };
}