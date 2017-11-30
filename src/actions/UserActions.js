/**
 * Created by nishavaity on 10/20/17.
 */
import * as types from '../../src/constants/ActionTypes';
import fetch from 'isomorphic-fetch';
import { fetchPut, fetchGet, fetchPost, fetchDelete } from 'utils/fetch';

export function addPreference(userId, preferenceId, projectId) {
    const formValues = {uid: userId, prefId: preferenceId, pid: projectId};
    return dispatch => {
        const request = fetchPut('api/addPreference', formValues)
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
        const request = fetchPut('api/user', formValues)
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
        const logout = fetchPost('api/logout')
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
        const courses = fetchGet('api/getAllCourses')
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
        const users = fetchGet('api/getAllUsers')
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
        const user = fetchGet(`api/user/${uid}`)
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
        const request = fetch('api/login', formValues)
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
        const request = fetchPut('api/signup', formValues)
        .then((response) => {
            if (response.status != 200) {
                return dispatch(signUpUserFailure(response));
            }
            return dispatch(signUpUserSuccess(response.user));
        });
    };
}

export function signUpUserSuccess(user) {
    return {
        type: types.SIGNUP_USER_SUCCESS,
        user
    };
}

export function signUpUserFailure(error) {
  return {
    type: types.SIGNUP_USER_FAIL,
    payload: error
  };
}
export function registerUser(formValues) {
    return dispatch => {
        const request = fetch('api/user', formValues)
        .then(response => response.json())
        .then((response) => {
            if (response.status != 200) {
                return dispatch(registerUserFailure(response));
            }
            return dispatch(registerUserSuccess(response.user));
        });
    };
}

export function registerUserSuccess(user) {
    return {
        type: types.REGISTER_USER_SUCCESS,
    };
}

export function registerUserFailure(error) {
  return {
    type: types.REGISTER_USER_FAIL,
    payload: error
  };
}
export function updateCourse(formValues) {
    return dispatch => {
        const request = fetchPut('api/course', formValues)
        .then((response) => {
            if (response.status != 200) {
                return dispatch(updateCourseFailure(response));
            }
            return dispatch(updateCourseSuccess(response.courses));
        });
    };
}
export function updateCourseSuccess(courses) {
    return {
        type: types.UPDATE_COURSE_SUCCESS,
        courses
    };
}
export function updateCourseFailure(err) {
    return {
        type: types.UPDATE_COURSE_FAILURE,
        err
    };
}

export function addCourse(formValues) {
    return dispatch => {
        const request = fetchPost('api/course', formValues)
        .then((response) => {
            if (response.status != 200) {
                return dispatch(addCourseFailure(response));
            }
            return dispatch(addCourseSuccess(response.courses));
        });
    };
}
export function addCourseSuccess(courses) {
    return {
        type: types.ADD_COURSE_SUCCESS,
        courses
    };
}
export function addCourseFailure(err) {
    return {
        type: types.ADD_COURSE_FAILURE,
        err
    };
}
export function deleteCourse(formValues) {
    return dispatch => {
        const request = fetchDelete('api/course/'+formValues)
        .then((response) => {
            if (response.status != 200) {
                return dispatch(deleteCourseFailure(response));
            }
            return dispatch(deleteCourseSuccess(response.courses));
        });
    };
}
export function deleteCourseSuccess(courses) {
    return {
        type: types.DELETE_COURSE_SUCCESS,
        courses
    };
}
export function deleteCourseFailure(err) {
    return {
        type: types.DELETE_COURSE_FAILURE,
        err
    };
}
export function uploadFile(url, formData) {
    return dispatch => {
        const request = fetch(url, {
            method: 'POST',
            'Content-Type': 'multipart/form-data',
            body: formData
            })
            .then(response => response.json())
            .then((response) => {
                if (response.status != 200) {
                    return dispatch(uploadFileFailure(response));
                }
                return dispatch(uploadFileSuccess(response.user));
            });
    }
}
export function uploadFileSuccess(user) {
    return {
        type: types.UPLOAD_FILE_SUCCESS,
        user
    };
}
export function uploadFileFailure(err) {
    return {
        type: types.UPLOAD_FILE_FAIL,
        err
    };
}