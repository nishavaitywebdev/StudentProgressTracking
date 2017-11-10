/**
 * Created by nishavaity on 10/21/17.
 */
import * as types from '../../src/constants/ActionTypes';
const initialState = {
    projects: [1, 2, 3, 4, 5, 6],
    projectById: [
        { id: 1, name: "Capstone1", desc: "Something", ownedBy: 4, instructor: -1, topic: "Web",
            preferredBy: [], teamId: 1, state: "ACTIVE", expectedResult: "", teamSize: 4, term: "Spring 2018" },
        { id: 2, name: "Capstone2", desc: "Something", ownedBy: 4, instructor: -1, topic: "Databases",
            preferredBy: [], teamId: 2, state: "ACTIVE", expectedResult: "", teamSize: 4, term: "Spring 2018" },
        { id: 3, name: "Capstone3", desc: "Something", ownedBy: 5, instructor: -1, topic: "Web",
            preferredBy: [], teamId: 3, state: "ACTIVE", expectedResult: "", teamSize: 4, term: "Spring 2018" },
        { id: 4, name: "Capstone4", desc: "Something", ownedBy: 5, instructor: -1, topic: "Web",
            preferredBy: [], teamId: 4, state: "ACTIVE", expectedResult: "", teamSize: 4, term: "Spring 2018" },
        { id: 5, name: "Capstone5", desc: "Something", ownedBy: 4, instructor: -1, topic: "Web",
            preferredBy: [], teamId: 5, state: "ACTIVE", expectedResult: "", teamSize: 4, term: "Spring 2018" },
        { id: 6, name: "Capstone6", desc: "Something", ownedBy: 4, instructor: -1, topic: "Web",
            preferredBy: [], teamId: 6, state: "ACTIVE", expectedResult: "", teamSize: 4, term: "Spring 2018" },
    ],
    filterText: '',
    topicFilter: '',
    termFilter: ''
}

export default function projects(state = initialState, action) {
    let currProjects = state.projectById;
    switch (action.type) {
        case types.ADD_PROJECT:
            const projId = state.projects.length + 1;
            const newProj = {...action.project, teamId: projId, id: projId};
            return {
                projects: [...state.projects, projId],
                projectById: [...state.projectById, newProj],
                filterText: state.filterText,
            }
        case types.EDIT_PROJECT:
            const updatedProject = action.project;
            const pId = updatedProject.id;
            let editedProjects = currProjects.filter(project => project.id != pId);
            editedProjects.push(updatedProject);
            return {
                projects: state.projects,
                projectById: editedProjects,
                filterText: state.filterText,
                topicFilter: state.topicFilter,
                termFilter: state.termFilter,
            }
        case types.DELETE_PROJECT:
            const projectId = action.pId;
            let deletedProjects = currProjects.filter(project => project.id != projectId);
            return {
                projects: state.projects,
                projectById: deletedProjects,
                filterText: state.filterText,
                topicFilter: state.topicFilter,
                termFilter: state.termFilter,
            }
        case types.ADD_PREFERREDBY:
            const userId = action.payload.user;
            const prId = action.payload.projId;
            const prevPrefId = action.payload.prevPreferenceProjectId;
            state.projectById.find(function (p) {
                return p.id === prId;
            }).preferredBy.push(userId);
            if(prevPrefId > -1) {
                const index = state.projectById.find(function (p) {
                    return p.id === prevPrefId;
                }).preferredBy.indexOf(userId);
                state.projectById.find(function (p) {
                    return p.id === prevPrefId;
                }).preferredBy.splice(index, 1);
            }
            return {
                projects: state.projects,
                projectById: state.projectById,
                filterText: state.filterText,
                topicFilter: state.topicFilter,
                termFilter: state.termFilter,
            }
        case types.FILTER_PROJECT:
            const searchText = action.searchText === undefined ? state.filterText: action.searchText;
            const topic = action.payload === undefined ? state.topicFilter: action.payload.topic;
            const term = action.payload === undefined ? state.termFilter: action.payload.term;
            return {
                projects: state.projects,
                projectById: state.projectById,
                filterText: searchText,
                topicFilter: topic,
                termFilter: term,
            }
        default:
            return state;
    }
}