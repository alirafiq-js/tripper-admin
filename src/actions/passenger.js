import { HTTP } from '../utils/HTTP';

import {
    PASSENGER_GET_SUCCESS,
    SHOW_LOADER,
    HIDE_LOADER,
    PASSENGER_EMPTY_SUCCESS,
    PASSENGER_DELETE_SUCCESS,
    PASSENGER_GET_DETAILS_SUCCESS,
} from '../constants/actionTypes';


export function getAllPassenger({ page, limit, searchText, type }) {

    return function (dispatch) {
        return new Promise(async function (resolve, reject) {
            dispatch({
                type: SHOW_LOADER,
            });
            const token = localStorage.getItem('auth');
            let uri =  `/passenger/list/?page=${page}&limit=${limit}`;
            if(searchText){
                uri = `${uri}&search=${searchText}`
            }
            if(type){
                uri = `${uri}&search=${searchText}&type=${type}`
            }
            HTTP('get',uri, null, { Authorization: `Bearer ${token}` })
                .then(function (response) {
                    console.log("response in  passenger ==>>", response.data);
                    dispatch({
                        type: PASSENGER_GET_SUCCESS,
                        data: response.data
                      });
                    dispatch({
                        type: HIDE_LOADER,
                    });
                    resolve(response.data);
                })
                .catch(error => {
                    console.log("error in  passenger", error)
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

export function getFilterPassenger({ page, limit, searchText }) {

    return function (dispatch) {
        return new Promise(async function (resolve, reject) {
            dispatch({
                type: SHOW_LOADER,
            });
            const token = localStorage.getItem('auth');
            let uri =  `/passenger/list/?page=${page}&limit=${limit}`;
            if(searchText){
                uri = `${uri}&search=${searchText}`
            }
            HTTP('get', uri, null, { Authorization: `Bearer ${token}` })
                .then(function (response) {
                    console.log("response in  buses ==>>", response);
                    dispatch({
                        type: PASSENGER_EMPTY_SUCCESS
                      });
                    dispatch({
                        type: PASSENGER_GET_SUCCESS,
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

export function deletePassenger(id) {

    return function (dispatch) {
        return new Promise(async function (resolve, reject) {
            dispatch({
                type: SHOW_LOADER,
            });
            const token = localStorage.getItem('auth');
            HTTP('post', `/passenger/remove/${id}`, null, { Authorization: `Bearer ${token}` })
                .then(function (response) {
                    console.log("response in  buses delete ==>>", response);
                    dispatch({
                        type:PASSENGER_DELETE_SUCCESS,
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


export function addPassenger(data) {
    console.log("add Bus", data);

    return function (dispatch) {
        return new Promise(async function (resolve, reject) {
            dispatch({
                type: SHOW_LOADER,
            });
            let token = localStorage.getItem('auth');
            HTTP('post', `/passenger/add`, data, { Authorization: `Bearer ${token}`  })
                .then(function (response) {
                    dispatch({
                        type:PASSENGER_EMPTY_SUCCESS
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

export function updatePassenger({id,data}) {
    console.log("update passnger",id, data);

    return function (dispatch) {
        return new Promise(async function (resolve, reject) {
            dispatch({
                type: SHOW_LOADER,
            });
            let token = localStorage.getItem('auth');
            HTTP('post', `/passenger/update/${id}`, data, { Authorization: `Bearer ${token}` })
                .then(function (response) {
                    dispatch({
                        type:PASSENGER_EMPTY_SUCCESS
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

export function getPassengerDetails(id) {

    return function (dispatch) {
        return new Promise(async function (resolve, reject) {
            dispatch({
                type: SHOW_LOADER,
            });
            let token = localStorage.getItem('auth');
            HTTP('get', `/customer/detail/${id}`, { user_id: id }, { Authorization: `Bearer ${token}` })
                .then(function (response) {
                    console.log("response in  passenger ==>>", response);
                    dispatch({
                        type: PASSENGER_GET_DETAILS_SUCCESS,
                        data: response.data
                      });
                    dispatch({
                        type: HIDE_LOADER,
                    });
                    resolve(response.data);
                })
                .catch(error => {
                    console.log("error in  passnger", error)
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