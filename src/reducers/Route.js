import {
    ROUTE_GET_SUCCESS,
    ROUTE_FILTER_GET_SUCCESS,
    ROUTE_EMPTY_SUCCESS,
    ROUTE_DELETE_SUCCESS,
    ROUTE_GET_DETAILS_SUCCESS,
} from '../constants/actionTypes';

import initialState from '../store/initialState';
import { filterDuplicate } from '../utils/helper';

const route_reducer = (state = initialState.routes, action) => {
    switch (action.type) {

        case ROUTE_EMPTY_SUCCESS:
            return {
                ...state,
                allRoutes: {
                    data: []
                }
            }

        case ROUTE_GET_DETAILS_SUCCESS:
            return {
                ...state,
                details: {
                    data: action.data.data
                }
            }

        case ROUTE_GET_SUCCESS:
            const filtered = filterDuplicate(state.allRoutes.data, action.data.data);
            return {
                ...state,
                allRoutes: {
                    ...action.data,
                    data: [...state.allRoutes.data, ...filtered]
                }
            }
        case ROUTE_FILTER_GET_SUCCESS:
            const _filtered = filterDuplicate(state.allRoutes.data, action.data.data);
            return {
                ...state,
                allRoutes: {
                    ...action.data,
                    data: [...state.allRoutes.data, ..._filtered]
                }
            }
        case ROUTE_DELETE_SUCCESS:
            const _filteredDeletedDriver = state.allRoutes.data.filter((_route)=> _route._id.toString() !== action.data.data._id.toString());
            return {
                ...state,
                allRoutes: {
                    ...action.data,
                    data: _filteredDeletedDriver
                }
            }
        default:
            return state;
    }
};

export default route_reducer;