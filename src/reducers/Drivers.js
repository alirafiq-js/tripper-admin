import {
    DRIVERS_GET_SUCCESS,
    USER_CREATE_SUCCESS,
    USER_UPDATE_SUCCESS,
    SAVE_ONLINE_USER,
    BOOKING_MANAGER_GET_SUCCESS,
    DRIVERS_FILTER_GET_SUCCESS,
    DRIVERS_EMPTY_SUCCESS,
    DRIVERS_DELETE_SUCCESS,
    DRIVERS_GET_DETAILS_SUCCESS,
} from '../constants/actionTypes';

import initialState from '../store/initialState';
import { filterDuplicate } from '../utils/helper';

const driver_reducer = (state = initialState.drivers, action) => {
    switch (action.type) {

        case DRIVERS_EMPTY_SUCCESS:
            return {
                ...state,
                allDrivers: {
                    data: []
                }
            }

        case DRIVERS_GET_DETAILS_SUCCESS:
            return {
                ...state,
                details: {
                    data: action.data.data
                }
            }

        case DRIVERS_GET_SUCCESS:
            console.log('-----------------case',action.data)
            const filtered = filterDuplicate(state.allDrivers.data, action.data.data);
            console.log('-----------------case filtered',filtered)
            return {
                ...state,
                allDrivers: {
                    ...action.data,
                    data: [...state.allDrivers.data, ...filtered]
                }
            }
        case DRIVERS_FILTER_GET_SUCCESS:
            const _filtered = filterDuplicate(state.allDrivers.data, action.data.data);
            return {
                ...state,
                allDrivers: {
                    ...action.data,
                    data: [...state.allDrivers.data, ..._filtered]
                }
            }
        case DRIVERS_DELETE_SUCCESS:
            // const _filtered = filterDuplicate(state.allDrivers.data, action.data.data);
            console.log("----------action data i delte",action.data)
            const _filteredDeletedDriver = state.allDrivers.data.filter((_driver)=> _driver._id.toString() !== action.data.data._id.toString());
            return {
                ...state,
                allDrivers: {
                    ...action.data,
                    data: _filteredDeletedDriver
                }
            }
        case BOOKING_MANAGER_GET_SUCCESS:
            const filteredManager = filterDuplicate(state.bookingManagers.data, action.data.data);
            return {
                ...state,
                bookingManagers: {
                    ...action.data,
                    data: [...state.bookingManagers.data, ...filteredManager]
                }
            }
        case USER_CREATE_SUCCESS:
            return {
                ...state,
                allDrivers: { ...action.data }
            }
        case USER_UPDATE_SUCCESS:
            return {
                ...state,
                allDrivers: { ...action.data }
            }
        case SAVE_ONLINE_USER:
            return Object.assign(
                {},
                state,
                { onlineUser: action.data }
            );
        default:
            return state;
    }
};

export default driver_reducer;
