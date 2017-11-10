/**
 * Created by nishavaity on 10/25/17.
 */
import * as types from '../../src/constants/ActionTypes';

export function addTeam(team) {
    return {
        type: types.ADD_TEAM,
        team
    };
}
export function updateTeam(team) {
    return {
        type: types.UPDATE_TEAM,
        team
    };
}