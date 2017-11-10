/**
 * Created by nishavaity on 10/21/17.
 */
import * as types from '../../src/constants/ActionTypes';

export const addProject = (project) => ({
    type: types.ADD_PROJECT,
    project
});

export const editProject = (project) => ({
    type: types.EDIT_PROJECT,
    project
});

export const setFilterText = (searchText) => ({
    type: types.FILTER_PROJECT,
    searchText
});
export const setFilters = (topicFilter, termFilter) => ({
    type: types.FILTER_PROJECT,
    payload: {topic: topicFilter, term: termFilter}
});
export function addProjectPreferredBy(userId, projectId, prevPreferenceProjectId) {
    return {
        type: types.ADD_PREFERREDBY,
        payload: { user: userId, projId: projectId, prevPreferenceProjectId: prevPreferenceProjectId}
    };
}
export const deleteProject = (pId) => ({
    type: types.DELETE_PROJECT,
    pId
});