/**
 * Created by nishavaity on 10/21/17.
 */
import * as types from '../../src/constants/ActionTypes';
const initialState = {
    projects: [1, 2, 3, 4, 5, 6],
    projectById: [
        { id: 1, name: "Capstone1", desc: "Something", ownedBy: 4, preferredBy: [1, 2], teamId: 1 },
        { id: 2, name: "Capstone2", desc: "Something", ownedBy: 4, preferredBy: [1], teamId: 2 },
        { id: 3, name: "Capstone3", desc: "Something", ownedBy: 5, preferredBy: [6], teamId: 3 },
        { id: 4, name: "Capstone4", desc: "Something", ownedBy: 5, preferredBy: [2], teamId: 4 },
        { id: 5, name: "Capstone5", desc: "Something", ownedBy: 4, preferredBy: [2], teamId: 5 },
        { id: 6, name: "Capstone6", desc: "Something", ownedBy: 4, preferredBy: [1, 6], teamId: 6 },
    ]
}

export default function projects(state = initialState, action) {
    switch (action.type) {
        case types.ADD_PROJECT:
            const projId = state.projects.length + 1;
            const newProj = {id: projId, name: action.project.name, desc: action.project.desc};
            return {
                projects: [...state.projects, projId],
                projectById: [...state.projectById, newProj],
            }
        case types.EDIT_PROJECT:
            const editedProj = action.project;
            let currProjects = state.projectById;
            currProjects.forEach(function (value) {
                if(value.id === editedProj.id) {
                    value.name = editedProj.name;
                    value.desc = editedProj.desc;
                }
            });
            return {
                projects: state.projects,
                projectById: currProjects,
            }
        default:
            return state;
    }
}