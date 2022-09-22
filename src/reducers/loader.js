import {
    SHOW_LOADER,
    HIDE_LOADER
} from './../constants/actionTypes';

import initialState from './../store/initialState';

const loader_reducer = (state = initialState.loader, action) => {
    switch (action.type) {
        case SHOW_LOADER:
            return Object.assign({
                loading: true
            })
        case HIDE_LOADER:
            return Object.assign({
                loading: false
            })
        default:
            return state;
    }
};

export default loader_reducer; 
