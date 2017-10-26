/**
 * Created by nishavaity on 10/20/17.
 */
import * as types from '../../src/constants/ActionTypes';

export function addPreference(preferenceId, projectId) {
    return {
        type: types.ADD_PREFERENCE,
        payload: { pref: preferenceId, projId: projectId, }
    };
}
export function addUser(user) {
    return {
        type: types.ADD_USER,
        user
    };
}
export function getUser(user) {
    return {
        type: types.GET_USER,
        user
    };
}
