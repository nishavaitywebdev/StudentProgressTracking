/**
 * Created by nishavaity on 10/22/17.
 */
import { combineReducers } from 'redux';
import projectReducer from './projects';
import userReducer from './users';
import teamReducer from './teams';
import commentReducer from './comments';

const progressApp = combineReducers({
    projectReducer,
    userReducer,
    teamReducer,
    commentReducer,
})

export default progressApp
