/**
 * Created by nishavaity on 10/25/17.
 */
import * as types from '../../src/constants/ActionTypes';
const initialState = {
    teams: [1, 2, 3, 4, 5, 6],
    teamById: {
        1: { id: 1, members: [], ownedBy: 4, projectId: 1},
        2: { id: 2, members: [], ownedBy: 4, projectId: 2},
        3: { id: 3, members: [], ownedBy: 4, projectId: 3},
        4: { id: 4, members: [], ownedBy: 4, projectId: 4},
        5: { id: 5, members: [], ownedBy: 4, projectId: 5},
        6: { id: 6, members: [], ownedBy: 4, projectId: 6},
    },
}

export default function teams(state = initialState, action) {
    switch (action.type) {
        case types.ADD_TEAM:
            const teamId = state.teams.length + 1;
            const newTeam = {...action.team, id: teamId};
            return {
                teams: [...state.teams, teamId],
                teamById: {...state.teamById, newTeam},
            }
        case types.UPDATE_TEAM:
            let newstate = {};
            const team = action.team;
            const id = action.team.id;
            state.teamById[id] = team;
            newstate = {
                teams: state.teams,
                teamById: state.teamById,
            };
            return newstate;
        default:
            return state;
    }
}