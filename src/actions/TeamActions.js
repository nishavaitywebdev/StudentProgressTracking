/**
 * Created by nishavaity on 10/25/17.
 */
import * as types from '../../src/constants/ActionTypes';
import { fetchPut, fetchGet, fetchPost } from 'utils/fetch';

export function addTeam(team) {
    return dispatch => {
        const request = fetchPost('addTeam', team)
        .then((response) => {
            if (response.status != 200) {
                return dispatch(addTeamFailure(response));
            }
            return dispatch(addTeamSuccess(response.team));
        });
    };
};
export function addTeamSuccess(team) {
    return {
        type: types.ADD_TEAM_SUCCESS,
        team
    };
};
export function addTeamFailure(err) {
    return {
        type: types.ADD_TEAM_FAIL,
        err
    };
};
export function updateTeam(team) {
    return dispatch => {
        const request = fetchPut('updateTeam', team)
        .then((response) => {
            if (response.status != 200) {
                return dispatch(updateTeamFailure(response));
            }
            return dispatch(updateTeamSuccess(response.team));
        });
    };
};
export function updateTeamSuccess(team) {
    return {
        type: types.UPDATE_TEAM_SUCCESS,
        team
    };
};
export function updateTeamFailure(err) {
    return {
        type: types.UPDATE_TEAM_FAILURE,
        err
    };
};
export function getTeam(tid) {
    return dispatch => {
        const request = fetchGet(`getTeam/${tid}`)
        .then((response) => {
            if (response.status != 200) {
                return dispatch(getTeamFailure(response));
            }
            return dispatch(getTeamSuccess(response.team));
        });
    };
};
export function getTeamSuccess(team) {
    return {
        type: types.GET_TEAM_SUCCESS,
        team
    };
};
export function getTeamFailure(err) {
    return {
        type: types.GET_TEAM_FAILURE,
        err
    };
};