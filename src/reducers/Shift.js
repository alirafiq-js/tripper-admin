import {
    SHIFT_GET_SUCCESS,
    SHIFT_FILTER_GET_SUCCESS,
    SHIFT_EMPTY_SUCCESS,
    SHIFT_DELETE_SUCCESS,
    SHIFT_GET_DETAILS_SUCCESS,
} from '../constants/actionTypes';

import initialState from '../store/initialState';
import { filterDuplicate } from '../utils/helper';

const bus_reducer = (state = initialState.shifts, action) => {
    console.log('---------state in resport buses', state,action);
    switch (action.type) {

        case SHIFT_EMPTY_SUCCESS:
            return {
                ...state,
                allShifts: {
                    data: []
                }
            }

        case SHIFT_GET_DETAILS_SUCCESS:
            return {
                ...state,
                details: {
                    data: action.data.data
                }
            }

        case SHIFT_GET_SUCCESS:
            console.log('-----------------case',action.data)
            const filtered = filterDuplicate(state.allShifts.data, action.data.data);
            console.log('-----------------case filtered',filtered)
            return {
                ...state,
                allShifts: {
                    ...action.data,
                    data: [...state.allShifts.data, ...filtered]
                }
            }
        case SHIFT_FILTER_GET_SUCCESS:
            const _filtered = filterDuplicate(state.allShifts.data, action.data.data);
            return {
                ...state,
                allShifts: {
                    ...action.data,
                    data: [...state.allShifts.data, ..._filtered]
                }
            }
        case SHIFT_DELETE_SUCCESS:
            // const _filtered = filterDuplicate(state.allShifts.data, action.data.data);
            console.log("----------action data i delte",action.data)
            const _filteredDeletedDriver = state.allShifts.data.filter((_driver)=> _driver._id.toString() !== action.data.data._id.toString());
            return {
                ...state,
                allShifts: {
                    ...action.data,
                    data: _filteredDeletedDriver
                }
            }
        default:
            return state;
    }
};

export default bus_reducer;
