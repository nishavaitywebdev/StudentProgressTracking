/**
 * Created by nishavaity on 10/21/17.
 */
import * as types from '../../src/constants/ActionTypes';
import { fetchPut, fetchGet, fetchPost } from 'utils/fetch';
import fetch from 'isomorphic-fetch';

export function addProject(formValues) {
    return dispatch => {
        const request = fetchPost('createProject', formValues)
        .then(response => response.json())
        .then((response) => {
            if (response.status != 200) {
                return dispatch(addProjectFailure(response));
            }
            return dispatch(addProjectSuccess());
        });
    };
};

export function addProjectSuccess() {
    return {
        type: types.ADD_PROJECT_SUCCESS,
    };
}

export function addProjectFailure(error) {
  return {
    type: types.ADD_PROJECT_FAIL,
    payload: error
  };
}

export function editProject(formValues) {
    return dispatch => {
        const request = fetchPut('editProject', formValues)
        .then((response) => {
            if (response.status != 200) {
                return dispatch(editProjectFailure(response));
            }
            return dispatch(editProjectSuccess(response.project));
        });
    };
};

export function editProjectSuccess(project) {
    return {
        type: types.EDIT_PROJECT_SUCCESS,
        project
    };
};

export function editProjectFailure(err) {
    return {
        type: types.EDIT_PROJECT_FAIL,
        err
    };
};

export const setFilterText = (searchText) => ({
    type: types.FILTER_PROJECT,
    searchText
});
export const setFilters = (topicFilter, termFilter) => ({
    type: types.FILTER_PROJECT,
    payload: {topic: topicFilter, term: termFilter}
});

export function addProjectPreferredBy(userId, projectId, prevPreferenceProjectId) {
    const obj = { user: userId, projId: projectId, prevPreferenceProjectId: prevPreferenceProjectId};
    return dispatch => {
        const request = fetchPut('addPreferredBy', obj)
        .then((response) => {
            if (response.status != 200) {
                return dispatch(addProjectPreferredByFailure(response));
            }
            return dispatch(addProjectPreferredBySuccess());
        });
    };
}

export function addProjectPreferredBySuccess() {
    return {
        type: types.ADD_PREFERREDBY_SUCCESS,
    };
}

export function addProjectPreferredByFailure(error) {
  return {
    type: types.ADD_PREFERREDBY_FAIL,
    payload: error
  };
}

export const deleteProject = (pId) => ({
    type: types.DELETE_PROJECT,
    pId
});

export function getProjects() {
    return dispatch => {
        const projects = fetchGet('getProjects')
        .then((response) => {
            if (response.status != 200) {
                return dispatch(getProjectsFailure(response));
            }
            return dispatch(getProjectsSuccess(response.projects));
        });
    };
}

export function getProjectsSuccess(projects) {
    return {
        type: types.GET_PROJECTS_SUCCESS,
        payload: projects
    };
}

export function getProjectsFailure(error) {
  return {
    type: types.GET_PROJECTS_FAILURE,
    payload: error
  };
}

export function getProjectDetails(pid) {
    return dispatch => {
        const request = fetchGet(`getProjectDetails/${pid}`)
        .then((response) => {
            if (response.status != 200) {
                return dispatch(getProjectDetailsFail(response));
            }
            return dispatch(getProjectDetailsSuccess(response.project));
        });
    };
}

export function getProjectDetailsSuccess(project) {
    return {
        type: types.GET_PROJECT_DETAILS_SUCCESS,
        payload: project
    };
}

export function getProjectDetailsFail(error) {
  return {
    type: types.GET_PROJECT_DETAILS_FAIL,
    payload: error
  };
}
