/**
 * Created by nishavaity on 10/23/17.
 */
import * as types from '../../src/constants/ActionTypes';
const initialState = {
    users: null, loggedIn: null, user: null, status:null, error:null, loading: false, reqUser: null, courses: null,
}

export default function users(state = initialState, action) {
    switch (action.type) {
        case types.SIGNIN_USER:// sign in user,  set loading = true and status = signin
            return { ...state, user: null, status:'signin', error:null, loading: true};
        case types.SIGNIN_USER_SUCCESS:
            return { ...state, loggedIn: action.payload, user: action.payload, status:'authenticated', error:null, loading: false}; //<-- authenticated
        case types.SIGNIN_USER_FAILURE:// return error and make loading = false
            return { ...state, user: null, loggedIn: null, status:'Invalid user', error: action.payload, loading: false};

        case types.SIGNUP_USER:// sign in user,  set loading = true and status = signin
            return { ...state, status:'signup', error:null, loading: true};
        case types.SIGNUP_USER_SUCCESS:
            return { ...state, loggedIn: action.user, status:'signup success', error:null, loading: false}; //<-- authenticated
        case types.SIGNUP_USER_FAIL:// return error and make loading = false
            error = action.payload.data || {message: action.payload.message};//2nd one is network or server down errors
            return { ...state, status:'signup', error:error, loading: false};

        case types.REGISTER_USER:// sign in user,  set loading = true and status = signin
            return { ...state, status:'registering', error:null, loading: true};
        case types.REGISTER_USER_SUCCESS:
            return { ...state, status:'registered', error:null, loading: false}; //<-- authenticated
        case types.REGISTER_USER_FAIL:// return error and make loading = false
            error = action.payload.data || {message: action.payload.message};//2nd one is network or server down errors
            return { ...state, status:'oops', error:error, loading: false};

        case types.ADD_COURSE:// sign in user,  set loading = true and status = signin
            return { ...state, status:'adding', error:null, loading: true};
        case types.ADD_COURSE_SUCCESS:
            return { ...state, courses: action.courses, status:'added', error:null, loading: false}; //<-- authenticated
        case types.ADD_COURSE_FAIL:// return error and make loading = false
            error = action.payload.data || {message: action.payload.message};//2nd one is network or server down errors
            return { ...state, status:'failed', error:error, loading: false};

        case types.DELETE_COURSE:// sign in user,  set loading = true and status = signin
            return { ...state, status:'deleting', error:null, loading: true};
        case types.DELETE_COURSE_SUCCESS:
            return { ...state, courses: action.courses, status:'deleted', error:null, loading: false}; //<-- authenticated
        case types.DELETE_COURSE_FAIL:// return error and make loading = false
            error = action.payload.data || {message: action.payload.message};//2nd one is network or server down errors
            return { ...state, status:'failed', error:error, loading: false};

        case types.DELETE_USER:// sign in user,  set loading = true and status = signin
            return { ...state, status:'deleting', error:null, loading: true};
        case types.DELETE_USER_SUCCESS:
            return { ...state, users: action.users, status:'deleted', error:null, loading: false}; //<-- authenticated
        case types.DELETE_USER_FAIL:// return error and make loading = false
            error = action.payload.data || {message: action.payload.message};//2nd one is network or server down errors
            return { ...state, status:'failed', error:error, loading: false};

        case types.LOGOUT_USER:
            return { ...state, status:'logging out', error:null, loading: true};
        case types.LOGOUT_SUCCESS:
            return { ...state, users: null, loggedIn: null, user: null, reqUser: null, courses: null, status:'logout', error:null, loading: false}; //<-- authenticated
        case types.LOGOUT_FAIL:// return error and make loading = false
            error = action.payload.data || {message: action.payload.message};//2nd one is network or server down errors
            return { ...state, status:'oops', error:error, loading: false};

        case types.UPDATE_USER:
            return { ...state, status:'updating', error:null, loading: true};
        case types.UPDATE_USER_SUCCESS:
            return { ...state, loggedIn: action.user, user: action.user, status:'updated', error:null, loading: false}; //<-- authenticated
        case types.UPDATE_USER_FAILURE:// return error and make loading = false
            error = action.payload.data || {message: action.payload.message};//2nd one is network or server down errors
            return { ...state, user: null, status:'update', error:error, loading: false};

        case types.UPLOAD_FILE:
            return { ...state, status:'uploading', error:null, loading: true};
        case types.UPLOAD_FILE_SUCCESS:
            return { ...state, loggedIn: action.user, user: action.user, status:'updated', error:null, loading: false}; //<-- authenticated
        case types.UPLOAD_FILE_FAILURE:// return error and make loading = false
            error = action.payload.data || {message: action.payload.message};//2nd one is network or server down errors
            return { ...state, user: null, status:'update', error:error, loading: false};

        case types.UPDATE_COURSE:
            return { ...state, status:'updating', error:null, loading: true};
        case types.UPDATE_COURSE_SUCCESS:
            return { ...state, courses: action.courses, status:'updated', error:null, loading: false}; //<-- authenticated
        case types.UPDATE_COURSE_FAILURE:// return error and make loading = false
            error = action.payload.data || {message: action.payload.message};//2nd one is network or server down errors
            return { ...state, status:'failed', error:error, loading: false};

        case types.GET_COURSES:
            return { ...state, status:'fetching', error:null, loading: true};
        case types.GET_COURSES_SUCCESS:
            return { ...state, courses: action.payload, status:'got it', error:null, loading: false}; //<-- authenticated
        case types.GET_COURSES_FAILURE:// return error and make loading = false
            error = action.payload.data || {message: action.payload.message};//2nd one is network or server down errors
            return { ...state, courses: null, status:'error', error:error, loading: false};

        case types.GET_USERS:
            return { ...state, status:'fetching', error:null, loading: true};
        case types.GET_USERS_SUCCESS:
            return { ...state, users: action.payload, status:'got it', error:null, loading: false}; //<-- authenticated
        case types.GET_USERS_FAILURE:// return error and make loading = false
            error = action.payload.data || {message: action.payload.message};//2nd one is network or server down errors
            return { ...state, users: null, status:'error', error:error, loading: false};

        case types.GET_USER:
            return { ...state, status:'fetching', error:null, loading: true};
        case types.GET_USER_SUCCESS:
            return { ...state, reqUser: action.payload, status:'got it', error:null, loading: false}; //<-- authenticated
        case types.GET_USER_FAILURE:// return error and make loading = false
            error = action.payload.data || {message: action.payload.message};//2nd one is network or server down errors
            return { ...state, reqUser: null, status:'error', error:error, loading: false};

        case types.ADD_PREFERENCE:
            return { ...state, status:'adding pref', error:null, loading: true};
        case types.ADD_PREFERENCE_SUCCESS:
            return { ...state, loggedIn: action.user, user: action.user, status:'updated', error:null, loading: false}; //<-- authenticated
        case types.ADD_PREFERENCE_FAIL:// return error and make loading = false
            error = action.payload.data || {message: action.payload.message};//2nd one is network or server down errors
            return { ...state, status:'update', error: error, loading: false};
        default:
            return state;
    }
}