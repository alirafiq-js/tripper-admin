import { HTTP } from '../utils/HTTP';

import {
    SHOW_LOADER,
    HIDE_LOADER,
    DASHBOARD_STATS_GET_SUCCESS,
    TOGGLE_SIDEBAR
} from './../constants/actionTypes';

export function getDashboardStats() {

    return function (dispatch) {
        return new Promise(async function (resolve, reject) {
            dispatch({
                type: SHOW_LOADER,
            });
            let token = localStorage.getItem('auth');
            HTTP('get', `/dashboard/stats`, null, { Authorization: `Bearer ${token}` })
                .then(function (response) {
                    console.log("response in dashboard ==>>", response);
                    dispatch({
                        type: DASHBOARD_STATS_GET_SUCCESS,
                        data: response.data
                      });
                    dispatch({
                        type: HIDE_LOADER,
                    });
                    resolve(response.data);
                })
                .catch(error => {
                    console.log("error in  dasboard", error)
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

export function minimizeSideBar(toggle) {
    console.log('======TOGLE',toggle);
    return function(dispatch){
        return new Promise(async function (resolve, reject) {
            dispatch({
                type: TOGGLE_SIDEBAR,
                data: toggle
            });
        });
    }
}