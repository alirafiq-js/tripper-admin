import {
    DASHBOARD_STATS_GET_SUCCESS,
    TOGGLE_SIDEBAR
} from './../constants/actionTypes';

import initialState from './../store/initialState';

const dashboard_reducer = (state = initialState.dashboard, action) => {
    switch (action.type) {

        case DASHBOARD_STATS_GET_SUCCESS:
            return {
                ...state,
                data: action.data.data
             }
        case TOGGLE_SIDEBAR:
            return {
                ...state,
                minimizeSideBar: action.data
            }
        default:
            return state;
    }
};

export default dashboard_reducer;
