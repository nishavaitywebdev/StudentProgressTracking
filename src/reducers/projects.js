/**
 * Created by nishavaity on 10/21/17.
 */
import * as types from '../../src/constants/ActionTypes';
const initialState = {
    projects: [1, 2, 3, 4, 5, 6],
    projectById: [
        { id: 1, name: "Capstone1", desc: "Something", ownedBy: 4,
            preferredBy: [1, 2], teamId: 1, state: "ACTIVE", expectedResult: "", teamSize: 4 },
        { id: 2, name: "Capstone2", desc: "Something", ownedBy: 4,
            preferredBy: [1], teamId: 2, state: "ACTIVE", expectedResult: "", teamSize: 4 },
        { id: 3, name: "Capstone3", desc: "Something", ownedBy: 5,
            preferredBy: [6], teamId: 3, state: "ACTIVE", expectedResult: "", teamSize: 4 },
        { id: 4, name: "Capstone4", desc: "Something", ownedBy: 5,
            preferredBy: [2], teamId: 4, state: "ACTIVE", expectedResult: "", teamSize: 4 },
        { id: 5, name: "Capstone5", desc: "Something", ownedBy: 4,
            preferredBy: [2], teamId: 5, state: "ACTIVE", expectedResult: "", teamSize: 4 },
        { id: 6, name: "Capstone6", desc: "Something", ownedBy: 4,
            preferredBy: [1, 6], teamId: 6, state: "ACTIVE", expectedResult: "", teamSize: 4 },
    ],
    filterText: ''
}

export default function projects(state = initialState, action) {
    let currProjects = state.projectById;
    switch (action.type) {
        case types.ADD_PROJECT:
            const projId = state.projects.length + 1;
            const newProj = {...action.project, id: projId};
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
            }
        case types.DELETE_PROJECT:
            const projectId = action.pId;
            let deletedProjects = currProjects.filter(project => project.id != projectId);
            return {
                projects: state.projects,
                projectById: deletedProjects,
                filterText: state.filterText,
            }
        case types.FILTER_PROJECT:
            return {
                projects: state.projects,
                projectById: state.projectById,
                filterText: action.searchText,
            }
        default:
            return state;
    }
}