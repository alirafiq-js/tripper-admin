import {
    PASSENGER_GET_SUCCESS,
    PASSENGER_FILTER_GET_SUCCESS,
    PASSENGER_EMPTY_SUCCESS,
    PASSENGER_DELETE_SUCCESS,
    PASSENGER_GET_DETAILS_SUCCESS,
} from '../constants/actionTypes';

import initialState from '../store/initialState';
import { filterDuplicate } from '../utils/helper';

const passenger_reducer = (state = initialState.passenger, action) => {
    switch (action.type) {

        case PASSENGER_EMPTY_SUCCESS:
            return {
                ...state,
                allPassengers: {
                    data: []
                }
            }

        case PASSENGER_GET_DETAILS_SUCCESS:
            return {
                ...state,
                details: {
                    data: action.data.data
                }
            }

        case PASSENGER_GET_SUCCESS:
            const filtered = filterDuplicate(state.allPassengers.data, action.data.data);
            return {
                ...state,
                allPassengers: {
                    ...action.data,
                    data: [...state.allPassengers.data, ...filtered]
                }
            }
        case PASSENGER_FILTER_GET_SUCCESS:
            const _filtered = filterDuplicate(state.allPassengers.data, action.data.data);
            return {
                ...state,
                allPassengers: {
                    ...action.data,
                    data: [...state.allPassengers.data, ..._filtered]
                }
            }
        case PASSENGER_DELETE_SUCCESS:
            // const _filtered = filterDuplicate(state.allPassengers.data, action.data.data);
            console.log("----------action data i delte",action.data)
            const _filteredDeletedDriver = state.allPassengers.data.filter((_driver)=> _driver._id.toString() !== action.data.data._id.toString());
            return {
                ...state,
                allPassengers: {
                    ...action.data,
                    data: _filteredDeletedDriver
                }
            }
        default:
            return state;
    }
};

export default passenger_reducer;
