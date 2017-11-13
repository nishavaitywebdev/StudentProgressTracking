/**
 * Created by nishavaity on 10/20/17.
 */
import * as types from '../../src/constants/ActionTypes';
import fetch from 'isomorphic-fetch';
import { fetchPut, fetchGet, fetchPost } from 'utils/fetch';

export function addPreference(userId, preferenceId, projectId) {
    const formValues = {uid: userId, prefId: preferenceId, pid: projectId};
    return dispatch => {
        const request = fetchPut('addPreference', formValues)
        .then((response) => {
            if (response.status != 200) {
                return dispatch(addProjectPreferenceFailure(response));
            }
            return dispatch(addProjectPreferenceSuccess(response.user));
        });
    };
}

export function addProjectPreferenceSuccess(user) {
    return {
        type: types.UPDATE_USER_SUCCESS,
        user
    };
}

export function addProjectPreferenceFailure(error) {
  return {
    type: types.ADD_PREFERENCE_FAIL,
    payload: error
  };
}

export function updateUser(formValues) {
    return dispatch => {
        const request = fetchPut('updateUser', formValues)
        .then((response) => {
            if (response.status != 200) {
                return dispatch(updateUserFailure(response));
            }
            return dispatch(updateUserSuccess(response.user));
        });
    };
}
export function updateUserSuccess(user) {
    return {
        type: types.UPDATE_USER_SUCCESS,
        user
    };
}
export function updateUserFailure(user) {
    return {
        type: types.UPDATE_USER_FAILURE,
        user
    };
}
export function logoutUser() {
    return dispatch => {
        const logout = fetchPost('logout')
        .then((response) => {
            if (response.status != 200) {
                return dispatch(logoutFailure(response));
            }
            return dispatch(logoutSuccess());
        });
    }
}
export function logoutSuccess() {
    return {
        type: types.LOGOUT_SUCCESS,
    };
}
export function logoutFailure(err) {
    return {
        type: types.LOGOUT_FAIL,
        err
    };
}
export function getCourses() {
    return dispatch => {
        const courses = fetchGet('getCourses')
        .then((response) => {
            if (response.status != 200) {
                return dispatch(getCoursesFailure(response));
            }
            return dispatch(getCoursesSuccess(response.courses));
        });
    };
};

export function getCoursesSuccess(courses) {
    return {
        type: types.GET_COURSES_SUCCESS,
        payload: courses
    };
};

export function getCoursesFailure(error) {
  return {
    type: types.GET_COURSES_FAILURE,
    payload: error
  };
};


export function getUsers() {
    return dispatch => {
        const users = fetchGet('getUsers')
        .then((response) => {
            if (response.status != 200) {
                return dispatch(getUsersFailure(response));
            }
            return dispatch(getUsersSuccess(response.users));
        });
    };
}

export function getUsersSuccess(users) {
    return {
        type: types.GET_USERS_SUCCESS,
        payload: users
    };
}

export function getUsersFailure(error) {
  return {
    type: types.GET_USERS_FAILURE,
    payload: error
  };
}

export function getUser(uid) {
    return dispatch => {
        const user = fetchGet(`getUser/${uid}`)
        .then((response) => {
            if (response.status != 200) {
                return dispatch(getUserFailure(response));
            }
            return dispatch(getUserSuccess(response.user));
        });
    };
}

export function getUserSuccess(user) {
    return {
        type: types.GET_USER_SUCCESS,
        payload: user
    };
}

export function getUserFailure(error) {
  return {
    type: types.GET_USER_FAILURE,
    payload: error
  };
}

export function signInUser(formValues) {
    return dispatch => {
        const request = fetch('login', formValues)
        .then(response => response.json())
        .then((jsonResponse) => {
            if (!jsonResponse.isAuthenticated) {
                return dispatch(signInUserFailure(jsonResponse));
            }
            return dispatch(signInUserSuccess(jsonResponse.user));
        });
    };
}

export function signInUserSuccess(user) {
    return {
        type: types.SIGNIN_USER_SUCCESS,
        payload: user
    };
}

export function signInUserFailure(error) {
  return {
    type: types.SIGNIN_USER_FAILURE,
    payload: error
  };
}

export function signUpUser(formValues) {
    return dispatch => {
        const request = fetch('register', formValues)
        .then(response => response.json())
        .then((response) => {
            if (response.status != 200) {
                return dispatch(signUpUserFailure(response));
            }
            return dispatch(signUpUserSuccess(response.user));
        });
    };
}

export function signUpUserSuccess() {
    return {
        type: types.SIGNUP_USER_SUCCESS,
    };
}

export function signUpUserFailure(error) {
  return {
    type: types.SIGNUP_USER_FAIL,
    payload: error
  };
}

