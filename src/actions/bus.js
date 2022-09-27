import { HTTP } from '../utils/HTTP';

import {
    BUS_GET_SUCCESS,
    SHOW_LOADER,
    HIDE_LOADER,
    BUS_EMPTY_SUCCESS,
    BUS_DELETE_SUCCESS,
    BUS_GET_DETAILS_SUCCESS,
} from '../constants/actionTypes';


export function getAllBus({ page=1, limit = 10, searchText, type }) {

    return function (dispatch) {
        return new Promise(async function (resolve, reject) {
            dispatch({
                type: SHOW_LOADER,
            });
            const token = localStorage.getItem('auth');
            let uri =  `/bus/list/?page=${page}&limit=${limit}`;
            if(searchText){
                uri = `${uri}&search=${searchText}`
            }
            if(type){
                uri = `${uri}&type=${type}`
            }
            HTTP('get',uri, null, { Authorization: `Bearer ${token}` })
                .then(function (response) {
                    console.log("response in  buses ==>>", response.data);
                    dispatch({
                        type: BUS_GET_SUCCESS,
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

export function getFilterBus({ page, limit, searchText }) {

    return function (dispatch) {
        return new Promise(async function (resolve, reject) {
            dispatch({
                type: SHOW_LOADER,
            });
            const token = localStorage.getItem('auth');
            let uri =  `/bus/list/?page=${page}&limit=${limit}`;
            if(searchText){
                uri = `${uri}&search=${searchText}`
            }
            HTTP('get', uri, null, { Authorization: `Bearer ${token}` })
                .then(function (response) {
                    console.log("response in  buses ==>>", response);
                    dispatch({
                        type: BUS_EMPTY_SUCCESS
                      });
                    dispatch({
                        type: BUS_GET_SUCCESS,
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

export function getUserDetails(id) {

    return function (dispatch) {
        return new Promise(async function (resolve, reject) {
            dispatch({
                type: SHOW_LOADER,
            });
            let token = localStorage.getItem('auth');
            HTTP('get', `/bus/details/${id}`, { user_id: id }, { Authorization: `Bearer ${token}` })
                .then(function (response) {
                    console.log("response in  buses ==>>", response);
                    dispatch({
                        type: BUS_GET_DETAILS_SUCCESS,
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

export function deleteBus(id) {

    return function (dispatch) {
        return new Promise(async function (resolve, reject) {
            dispatch({
                type: SHOW_LOADER,
            });
            const token = localStorage.getItem('auth');
            HTTP('post', `/bus/remove/${id}`, null, { Authorization: `Bearer ${token}` })
                .then(function (response) {
                    console.log("response in  buses delete ==>>", response);
                    dispatch({
                        type:BUS_DELETE_SUCCESS,
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

export function addBus(data) {
    console.log("add Bus", data);

    return function (dispatch) {
        return new Promise(async function (resolve, reject) {
            dispatch({
                type: SHOW_LOADER,
            });
            let token = localStorage.getItem('auth');
            HTTP('post', `/bus/add`, data, { Authorization: `Bearer ${token}`  })
                .then(function (response) {
                    dispatch({
                        type:BUS_EMPTY_SUCCESS
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

export function updateBus({id,data}) {
    console.log("update Bus",id, data);

    return function (dispatch) {
        return new Promise(async function (resolve, reject) {
            dispatch({
                type: SHOW_LOADER,
            });
            let token = localStorage.getItem('auth');
            HTTP('post', `/bus/update/${id}`, data, { Authorization: `Bearer ${token}` })
                .then(function (response) {
                    dispatch({
                        type:BUS_EMPTY_SUCCESS
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