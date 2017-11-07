/**
 * Created by nishavaity on 10/26/17.
 */

import * as types from '../../src/constants/ActionTypes';
const initialState = {
    comments: [1, 2, 3, 4, 5, 6],
    commentById: {
        1: { id: 1, commentText: "What is the status?", commentedBy: 4, projectId: 1},
        2: { id: 2, commentText: "What is the status?", commentedBy: 4, projectId: 2},
        3: { id: 3, commentText: "What is the status of the project?", commentedBy: 4, projectId: 3},
        4: { id: 4, commentText: "What is the status?", commentedBy: 4, projectId: 4},
        5: { id: 5, commentText: "What is the status?", commentedBy: 4, projectId: 5},
        6: { id: 6, commentText: "What is the status?", commentedBy: 4, projectId: 6},
    },
}
export default function comments(state = initialState, action) {
    switch (action.type) {
        // case types.ADD_TEAM:
        //     const teamId = state.teams.length + 1;
        //     const newTeam = {...action.team, id: teamId};
        //     return {
        //         teams: [...state.teams, teamId],
        //         teamById: {...state.teamById, newTeam},
        //     }
        // case types.UPDATE_TEAM:
        //     let newstate = {};
        //     const team = action.team;
        //     const id = action.team.id;
        //     state.teamById[id] = team;
        //     newstate = {
        //         teams: state.teams,
        //         teamById: state.teamById,
        //     };
        //     return newstate;
        default:
            return state;
    }
}
