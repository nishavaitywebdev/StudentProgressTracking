/**
 * Created by nishavaity on 10/22/17.
 */
import { combineReducers } from 'redux';
import preferenceReducer from './preferences';
import projectReducer from './projects';
import userReducer from './users';
import teamReducer from './teams';

const progressApp = combineReducers({
    preferenceReducer,
    projectReducer,
    userReducer,
    teamReducer,
})

export default progressApp
