/**
 * Created by nishavaity on 10/19/17.
 */
import * as types from '../../src/constants/ActionTypes';
const initialState = {
    preferenceById: {
        1: {
            id: 1,
            projectId: undefined,
        },
        2: {
            id: 2,
            projectId: undefined,
        },
        3: {
            id: 3,
            projectId: undefined,
        },
    }
};

const preferences = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case types.ADD_PREFERENCE:
            const prefId = action.payload.pref;
            const projId = action.payload.projId;
            return newState = {
                preferenceById: {
                    ...state.preferenceById,
                    [prefId]: {
                        id: prefId,
                        projectId: projId
                    }
                }
            }
    default:
        return state;
    }
}
export default preferences;