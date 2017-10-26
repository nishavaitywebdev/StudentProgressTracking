/**
 * Created by nishavaity on 10/25/17.
 */
import * as types from '../../src/constants/ActionTypes';

export function addTeam(projectId) {
    return {
        type: types.ADD_TEAM,
        payload: { projId: projectId, }
    };
}
export function updateTeam(team) {
    return {
        type: types.UPDATE_TEAM,
        team
    };
}