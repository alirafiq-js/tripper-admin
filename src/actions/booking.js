import { HTTP } from '../utils/HTTP';

import {
    BOOKING_GET_SUCCESS,
    SHOW_LOADER,
    HIDE_LOADER,
    BOOKING_EMPTY_SUCCESS,
    BOOKING_DELETE_SUCCESS,
    BOOKING_GET_DETAILS_SUCCESS,
} from '../constants/actionTypes';


export function getAllBookings({ page, limit, searchText, type }) {

    return function (dispatch) {
        return new Promise(async function (resolve, reject) {
            dispatch({
                type: SHOW_LOADER,
            });
            const token = localStorage.getItem('auth');
            let uri =  `/booking/list/?page=${page}&limit=${limit}`;
            if(searchText){
                uri = `${uri}&search=${searchText}`
            }
            if(type){
                uri = `${uri}&search=${searchText}&type=${type}`
            }
            HTTP('get',uri, null, { Authorization: `Bearer ${token}` })
                .then(function (response) {
                    console.log("response in  booking ==>>", response.data);
                    dispatch({
                        type: BOOKING_GET_SUCCESS,
                        data: response.data
                      });
                    dispatch({
                        type: HIDE_LOADER,
                    });
                    resolve(response.data);
                })
                .catch(error => {
                    console.log("error in  booking", error)
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

export function getFilterBooking({ page, limit, searchText }) {

    return function (dispatch) {
        return new Promise(async function (resolve, reject) {
            dispatch({
                type: SHOW_LOADER,
            });
            const token = localStorage.getItem('auth');
            let uri =  `/booking/list/?page=${page}&limit=${limit}`;
            if(searchText){
                uri = `${uri}&search=${searchText}`
            }
            HTTP('get', uri, null, { Authorization: `Bearer ${token}` })
                .then(function (response) {
                    console.log("response in  buses ==>>", response);
                    dispatch({
                        type: BOOKING_EMPTY_SUCCESS
                      });
                    dispatch({
                        type: BOOKING_GET_SUCCESS,
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

export function getBookingDetails(id) {

    return function (dispatch) {
        return new Promise(async function (resolve, reject) {
            dispatch({
                type: SHOW_LOADER,
            });
            let token = localStorage.getItem('auth');
            HTTP('get', `/booking/details/${id}`, { user_id: id }, { Authorization: `Bearer ${token}` })
                .then(function (response) {
                    console.log("response in  buses ==>>", response);
                    dispatch({
                        type: BOOKING_GET_DETAILS_SUCCESS,
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

export function deleteBooking(id) {

    return function (dispatch) {
        return new Promise(async function (resolve, reject) {
            dispatch({
                type: SHOW_LOADER,
            });
            const token = localStorage.getItem('auth');
            HTTP('post', `/booking/remove/${id}`, null, { Authorization: `Bearer ${token}` })
                .then(function (response) {
                    console.log("response in  buses delete ==>>", response);
                    dispatch({
                        type:BOOKING_DELETE_SUCCESS,
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


export function updateBooking({_id}) {
    console.log("update Booking", _id);

    return function (dispatch) {
        return new Promise(async function (resolve, reject) {
            dispatch({
                type: SHOW_LOADER,
            });
            let token = localStorage.getItem('auth');
            HTTP('post', `/booking/update`, { id: _id }, { Authorization: `Bearer ${token}` })
                .then(function (response) {
                    dispatch({
                        type:BOOKING_EMPTY_SUCCESS
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