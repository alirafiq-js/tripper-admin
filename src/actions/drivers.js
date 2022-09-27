import { HTTP } from '../utils/HTTP';

import {
    DRIVERS_GET_SUCCESS,
    BOOKING_MANAGER_GET_SUCCESS,
    SHOW_LOADER,
    HIDE_LOADER,
    SAVE_ONLINE_USER,
    DRIVERS_EMPTY_SUCCESS,
    DRIVERS_DELETE_SUCCESS,
    DRIVERS_GET_DETAILS_SUCCESS,
    REPORT_DRIVERS_GET_SUCCESS,
} from '../constants/actionTypes';


export function getAllDrivers({ page=1, limit = 10, searchText, type }) {

    return function (dispatch) {
        return new Promise(async function (resolve, reject) {
            dispatch({
                type: SHOW_LOADER,
            });
            const token = localStorage.getItem('auth');
            let uri =  `/driver/list/?page=${page}&limit=${limit}`;
            if(searchText){
                uri = `${uri}&search=${searchText}`
            }
            if(type){
                uri = `${uri}&type=${type}`
            }
            HTTP('get',uri, null, { Authorization: `Bearer ${token}` })
                .then(function (response) {
                    console.log("response in  drivers ==>>", response.data);
                    dispatch({
                        type: DRIVERS_GET_SUCCESS,
                        data: response.data
                      });
                    dispatch({
                        type: HIDE_LOADER,
                    });
                    resolve(response.data);
                })
                .catch(error => {
                    console.log("error in  drivers", error)
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

export function getFilterDriver({ page, limit, searchText }) {

    return function (dispatch) {
        return new Promise(async function (resolve, reject) {
            dispatch({
                type: SHOW_LOADER,
            });
            const token = localStorage.getItem('auth');
            let uri =  `/driver/list/?page=${page}&limit=${limit}`;
            if(searchText){
                uri = `${uri}&search=${searchText}`
            }
            HTTP('get', uri, null, { Authorization: `Bearer ${token}` })
                .then(function (response) {
                    console.log("response in  drivers ==>>", response);
                    dispatch({
                        type: DRIVERS_EMPTY_SUCCESS
                      });
                    dispatch({
                        type: DRIVERS_GET_SUCCESS,
                        data: response.data
                      });
                    dispatch({
                        type: HIDE_LOADER,
                    });
                    resolve(response.data);
                })
                .catch(error => {
                    console.log("error in  drivers", error)
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
            HTTP('get', `/driver/details/${id}`, { user_id: id }, { Authorization: `Bearer ${token}` })
                .then(function (response) {
                    console.log("response in  drivers ==>>", response);
                    dispatch({
                        type: DRIVERS_GET_DETAILS_SUCCESS,
                        data: response.data
                      });
                    dispatch({
                        type: HIDE_LOADER,
                    });
                    resolve(response.data);
                })
                .catch(error => {
                    console.log("error in  drivers", error)
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

export function getAllBookingManagers({page, limit, searchText}) {

    return function (dispatch) {
        return new Promise(async function (resolve, reject) {
            dispatch({
                type: SHOW_LOADER,
            });
            let token = localStorage.getItem('auth');
            HTTP('get', `/bookings/list/?page=${page}&limit=${limit}&search=${searchText}`, null, { Authorization: `Bearer ${token}` })
                .then(function (response) {
                    console.log("response in  booking managers ==>>", response);
                    dispatch({
                        type: BOOKING_MANAGER_GET_SUCCESS,
                        data: response.data
                      });
                    dispatch({
                        type: HIDE_LOADER,
                    });
                    resolve(response.data);
                })
                .catch(error => {
                    console.log("error in  booking managers", error)
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

export function userAnalyticsData() {

    return function (dispatch) {
        return new Promise(async function (resolve, reject) {
            dispatch({
                type: SHOW_LOADER,
            });
            const token = localStorage.getItem('auth');
            HTTP('get', 'admin/userAnalyticsData', null, { Authorization: `Bearer ${token}` })
                .then(function (response) {
                    console.log("response in  userAnalyticsData ==>>", response)
                    resolve(response.data);
                })
                .catch(error => {
                    console.log("error in  drivers", error)
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

export function saveOnlineUser(drivers) {

    return function (dispatch) {
        return new Promise(async function (resolve, reject) {
            dispatch({
                type: SAVE_ONLINE_USER,
                data: drivers
            });
            resolve({ message: 'online driver save' });
        });
    };
}

export function deleteDriver(id) {

    return function (dispatch) {
        return new Promise(async function (resolve, reject) {
            dispatch({
                type: SHOW_LOADER,
            });
            const token = localStorage.getItem('auth');
            HTTP('post', `/driver/remove/${id}`, null, { Authorization: `Bearer ${token}` })
                .then(function (response) {
                    console.log("response in  drivers delete ==>>", response);
                    dispatch({
                        type:DRIVERS_DELETE_SUCCESS,
                        data : response.data
                    });
                    dispatch({
                        type: HIDE_LOADER,
                    });
                    resolve(response.data);
                })
                .catch(error => {
                    console.log("error in  drivers delete", error)
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
                    console.log("error in  drivers", error)
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
export function getUserStats(id, startDate, endDate) {

    return function (dispatch) {
        return new Promise(async function (resolve, reject) {
            dispatch({
                type: SHOW_LOADER,
            });
            let token = localStorage.getItem('auth');
            HTTP('get', 'admin/driverStats/' + id + "?dateStart=" + startDate + "&dateEnd=" + endDate, null, { Authorization: `Bearer ${token}` })
                .then(function (response) {
                    console.log("response in  userStatsData ==>>", response)
                    resolve(response.data);
                })
                .catch(error => {
                    console.log("error in  drivers", error)
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
export function getUserEvents(id, eventType) {

    return function (dispatch) {
        return new Promise(async function (resolve, reject) {
            dispatch({
                type: SHOW_LOADER,
            });
            const token = localStorage.getItem('auth');
            HTTP('get', 'admin/driverEvents/' + id + '?type=' + eventType, null, { Authorization: `Bearer ${token}` })
                .then(function (response) {
                    console.log("response in  driverEventsData ==>>", response)
                    resolve(response.data);
                })
                .catch(error => {
                    console.log("error in  drivers", error)
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
export function getReportDrivers({ page, limit, searchText, university, country }) {

    return function (dispatch) {
        return new Promise(async function (resolve, reject) {
            dispatch({
                type: SHOW_LOADER,
            });
            const token = localStorage.getItem('auth');
            HTTP('get', `/driver/report/list/?page=${page}&limit=${limit}`, null, { Authorization: `Bearer ${token}` })
                .then(function (response) {
                    console.log("response in reporte  drivers ==>>", response);
                    dispatch({
                        type: REPORT_DRIVERS_GET_SUCCESS,
                        data: response.data
                      });
                    dispatch({
                        type: HIDE_LOADER,
                    });
                    resolve(response.data);
                })
                .catch(error => {
                    console.log("error in  drivers", error)
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
export function addDriver(data) {
    console.log("add driver", data);

    return function (dispatch) {
        return new Promise(async function (resolve, reject) {
            dispatch({
                type: SHOW_LOADER,
            });
            let token = localStorage.getItem('auth');
            HTTP('post', `/driver/add`, data, { Authorization: `Bearer ${token}`  })
                .then(function (response) {
                    dispatch({
                        type:DRIVERS_EMPTY_SUCCESS
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

export function updateDriver({id,data}) {
    console.log("update driver",id, data);

    return function (dispatch) {
        return new Promise(async function (resolve, reject) {
            dispatch({
                type: SHOW_LOADER,
            });
            let token = localStorage.getItem('auth');
            HTTP('post', `/driver/update/${id}`, data, { Authorization: `Bearer ${token}` })
                .then(function (response) {
                    dispatch({
                        type:DRIVERS_EMPTY_SUCCESS
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