/**
 * Created by nishavaity on 10/25/17.
 */
import * as types from '../../src/constants/ActionTypes';
const initialState = {
    team: null,
}

export default function teams(state = initialState, action) {
    switch (action.type) {
        case types.ADD_TEAM:
            return { ...state, status:'adding team', error:null, loading: true};
        case types.ADD_TEAM_SUCCESS:
            return { ...state, status:'added', error:null, loading: false}; //<-- authenticated
        case types.ADD_TEAM_FAIL:// return error and make loading = false
            error = action.payload.data || {message: action.payload.message};//2nd one is network or server down errors
            return { ...state, status:'oops', error:error, loading: false};

        case types.UPDATE_TEAM:
            return { ...state, status:'editing team', error:null, loading: true};
        case types.UPDATE_TEAM_SUCCESS:
            return { ...state, status:'edited', team: action.team, error:null, loading: false}; //<-- authenticated
        case types.UPDATE_TEAM_FAILURE:// return error and make loading = false
            error = action.payload.data || {message: action.payload.message};//2nd one is network or server down errors
            return { ...state, user: null, status:'oops', error:error, loading: false};

        case types.GET_TEAM:
            return { ...state, status:'getting team', error:null, loading: true};
        case types.GET_TEAM_SUCCESS:
            return { ...state, status:'got it', team: action.team, error:null, loading: false}; //<-- authenticated
        case types.GET_TEAM_FAILURE:// return error and make loading = false
            error = action.payload.data || {message: action.payload.message};//2nd one is network or server down errors
            return { ...state, user: null, status:'oops', error:error, loading: false};
        default:
            return state;
    }
}