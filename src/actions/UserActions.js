/**
 * Created by nishavaity on 10/20/17.
 */
import * as types from '../../src/constants/ActionTypes';
import fetch from 'isomorphic-fetch';
import { fetchPut } from 'utils/fetch';

export function addPreference(preferenceId, projectId) {
    return {
        type: types.ADD_PREFERENCE,
        payload: { pref: preferenceId, projId: projectId, }
    };
}
export function addUser(user) {
    return {
        type: types.ADD_USER,
        user
    };
}
export function updateUser(formValues) {
    return dispatch => {
        const request = fetchPut('updateUser', formValues)
        .then((response) => {
            if (response.status != 200) {
                return dispatch(updateUserFailure(response));
            }
            return dispatch(updateUserSuccess(JSON.parse(response.user)));
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
    return {
        type: types.LOGOUT_USER
    };
}
export function getUser(user) {
    return {
        type: types.GET_USER,
        user
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

