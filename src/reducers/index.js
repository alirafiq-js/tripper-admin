import { combineReducers } from 'redux';
import dashboard from './Dashboard';
import auth from './Auth';
import drivers from './Drivers';
import buses from './Bus';
import loader from './loader';

export default combineReducers({
    auth,
    drivers,
    buses,
    loader,
    dashboard,
});