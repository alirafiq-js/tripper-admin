import {
    BOOKING_GET_SUCCESS,
    BOOKING_FILTER_GET_SUCCESS,
    BOOKING_EMPTY_SUCCESS,
    BOOKING_DELETE_SUCCESS,
    BOOKING_GET_DETAILS_SUCCESS,
} from '../constants/actionTypes';

import initialState from '../store/initialState';
import { filterDuplicate } from '../utils/helper';

const booking_reducer = (state = initialState.bookings, action) => {
    switch (action.type) {

        case BOOKING_EMPTY_SUCCESS:
            return {
                ...state,
                allBookings: {
                    data: []
                }
            }

        case BOOKING_GET_DETAILS_SUCCESS:
            return {
                ...state,
                details: {
                    data: action.data.data
                }
            }

        case BOOKING_GET_SUCCESS:
            console.log('-----------------case',action.data)
            const filtered = filterDuplicate(state.allBookings.data, action.data.data);
            console.log('-----------------case filtered',filtered)
            return {
                ...state,
                allBookings: {
                    ...action.data,
                    data: [...state.allBookings.data, ...filtered]
                }
            }
        case BOOKING_FILTER_GET_SUCCESS:
            const _filtered = filterDuplicate(state.allBookings.data, action.data.data);
            return {
                ...state,
                allBookings: {
                    ...action.data,
                    data: [...state.allBookings.data, ..._filtered]
                }
            }
        case BOOKING_DELETE_SUCCESS:
            // const _filtered = filterDuplicate(state.allBookings.data, action.data.data);
            console.log("----------action data i delte",action.data)
            const _filteredDeletedDriver = state.allBookings.data.filter((_driver)=> _driver._id.toString() !== action.data.data._id.toString());
            return {
                ...state,
                allBookings: {
                    ...action.data,
                    data: _filteredDeletedDriver
                }
            }
        default:
            return state;
    }
};

export default booking_reducer;
