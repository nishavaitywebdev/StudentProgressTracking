/**
 * Created by nishavaity on 10/21/17.
 */
import * as types from '../../src/constants/ActionTypes';
import { fetchPut, fetchGet, fetchPost, fetchDelete } from 'utils/fetch';
import fetch from 'isomorphic-fetch';

export function addProject(formValues) {
    return dispatch => {
        const request = fetchPost('api/project', formValues)
        .then((response) => {
            if (response.status != 200) {
                return dispatch(addProjectFailure(response));
            }
            return dispatch(addProjectSuccess(response.projects));
        });
    };
};

export function addProjectSuccess(projects) {
    return {
        type: types.ADD_PROJECT_SUCCESS,
        projects
    };
}

export function addProjectFailure(error) {
  return {
    type: types.ADD_PROJECT_FAIL,
    payload: error
  };
}

export function deleteProject(pid) {
    return dispatch => {
        const request = fetchDelete(`api/project/${pid}`)
        .then((response) => {
            if (response.status != 200) {
                return dispatch(deleteProjectFailure(response));
            }
            return dispatch(deleteProjectSuccess(response.projects));
        });
    };
};

export function deleteProjectSuccess(projects) {
    return {
        type: types.DELETE_PROJECT_SUCCESS,
        projects
    };
}

export function deleteProjectFailure(error) {
  return {
    type: types.DELETE_PROJECT_FAIL,
    payload: error
  };
}

export function editProject(formValues) {
    return dispatch => {
        const request = fetchPut('api/project', formValues)
        .then((response) => {
            if (response.status != 200) {
                return dispatch(editProjectFailure(response));
            }
            return dispatch(editProjectSuccess(response.project));
        });
    };
};

function postOnSlack(project){
    const formValues = {channel: project.slackChannel,
    text: `The status of the project ${project.name} is changed to ${project.state}.`};
    const request = fetchPost('api/postOnSlack', formValues);
    return;
//    .then((response) => {
//        if (response.status != 200) {
//            return;
//        }
//        return dispatch(editProjectSuccess(response.project));
//    });
}

export function editProjectSuccess(project) {
    postOnSlack(project);
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
        const request = fetchPut('api/addPreferredBy', obj)
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

export function getProjects() {
    return dispatch => {
        const projects = fetchGet('api/getAllProjects')
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
        const request = fetchGet(`api/getProjectDetails/${pid}`)
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
export function uploadDescFile(url, formData) {
    return dispatch => {
        const request = fetch(url, {
            method: 'POST',
            'Content-Type': 'multipart/form-data',
            body: formData
            })
            .then(response => response.json())
            .then((response) => {
                if (response.status != 200) {
                    return dispatch(uploadDescFileFailure(response));
                }
                return dispatch(uploadDescFileSuccess(response.project));
            });
    }
}
export function uploadDescFileSuccess(project) {
    return {
        type: types.UPLOAD_DESC_FILE_SUCCESS,
        project
    };
}
export function uploadDescFileFailure(err) {
    return {
        type: types.UPLOAD_DESC_FILE_FAIL,
        err
    };
}