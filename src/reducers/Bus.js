import {
    BUS_GET_SUCCESS,
    BUS_FILTER_GET_SUCCESS,
    BUS_EMPTY_SUCCESS,
    BUS_DELETE_SUCCESS,
    BUS_GET_DETAILS_SUCCESS,
} from '../constants/actionTypes';

import initialState from '../store/initialState';
import { filterDuplicate } from '../utils/helper';

const bus_reducer = (state = initialState.buses, action) => {
    switch (action.type) {

        case BUS_EMPTY_SUCCESS:
            return {
                ...state,
                allBuses: {
                    data: []
                }
            }

        case BUS_GET_DETAILS_SUCCESS:
            return {
                ...state,
                details: {
                    data: action.data.data
                }
            }

        case BUS_GET_SUCCESS:
            console.log('-----------------case',action.data)
            const filtered = filterDuplicate(state.allBuses.data, action.data.data);
            console.log('-----------------case filtered',filtered)
            return {
                ...state,
                allBuses: {
                    ...action.data,
                    data: [...state.allBuses.data, ...filtered]
                }
            }
        case BUS_FILTER_GET_SUCCESS:
            const _filtered = filterDuplicate(state.allBuses.data, action.data.data);
            return {
                ...state,
                allBuses: {
                    ...action.data,
                    data: [...state.allBuses.data, ..._filtered]
                }
            }
        case BUS_DELETE_SUCCESS:
            // const _filtered = filterDuplicate(state.allBuses.data, action.data.data);
            console.log("----------action data i delte",action.data)
            const _filteredDeletedDriver = state.allBuses.data.filter((_driver)=> _driver._id.toString() !== action.data.data._id.toString());
            return {
                ...state,
                allBuses: {
                    ...action.data,
                    data: _filteredDeletedDriver
                }
            }
        default:
            return state;
    }
};

export default bus_reducer;
