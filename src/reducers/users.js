/**
 * Created by nishavaity on 10/23/17.
 */
import * as types from '../../src/constants/ActionTypes';
const initialState = {
    users: [1, 2, 3, 4, 5, 6],
    userById: {
        1: { id: 1, firstname: "Nisha", lastname: "Vaity", email: "nisha@gmail.com", username: "nisha", password:"nisha",
            role: "student", aboutMyself: "", coursesCompleted: [], projectPreferences: [] },
        2: { id: 2, firstname: "Rajiv", lastname: "Krishnan", email: "rajiv@gmail.com", username: "rajiv", password:"rajiv", role: "student",
            aboutMyself: "", coursesCompleted: [], projectPreferences: [] },
        3: { id: 3, firstname: "Admin", lastname: "Admin", email: "admin@gmail.com", username: "admin", password:"admin", role: "admin",},
        4: { id: 4, firstname: "Faculty", lastname: "Faculty", email: "Faculty@gmail.com", username: "Faculty", password:"Faculty", role: "faculty", },
        5: { id: 5, firstname: "Sponsor", lastname: "Sponsor", email: "Sponsor@gmail.com", username: "Sponsor", password:"Sponsor", role: "sponsor", },
        6: { id: 6, firstname: "Abhisha ", lastname: "Vaity", email: "abhisha@gmail.com", username: "abhisha", password:"abhisha", role: "student",
            aboutMyself: "", coursesCompleted: [], projectPreferences: [] },
    },
    loggedIn: null,
    courses: {
        1: "Web Development", 2: "Programming Design Paradigm",
        3: "Managing Software Development", 4: "Information Retrieval",
    },
}

export default function users(state = initialState, action) {
    switch (action.type) {
        case types.ADD_USER:
            const userId = state.users.length + 1;
            const newUser = {...action.user, id: userId};
            state.userById[userId] = newUser;
            return {
                users: [...state.users, userId],
                userById: state.userById,
                loggedIn: state.loggedIn,
                courses: state.courses,
            }
        case types.GET_USER:
            let newstate = {};
            const username = action.user.username;
            const password = action.user.password;
            Object.keys(state.userById).forEach(function (key) {
                let user = state.userById[key];
                if(user.username === username && user.password === password) {
                    newstate = {
                        users: state.users,
                        userById: state.userById,
                        loggedIn: user,
                        courses: state.courses,
                    }
                }
            });
            return newstate;
        case types.UPDATE_USER:
            const uid = action.user.id;
            const updatedUser = action.user;
            state.userById[uid] = updatedUser;
            return {
                users: [state.users],
                userById: state.userById,
                loggedIn: state.loggedIn,
                courses: state.courses,
            }
        case types.LOGOUT_USER:
            return {
                users: [state.users],
                userById: state.userById,
                loggedIn: null,
                courses: state.courses,
            }
        case types.ADD_PREFERENCE:
            const prefId = action.payload.pref;
            const projId = action.payload.projId;
            state.userById[state.loggedIn.id].projectPreferences.splice(prefId-1, 1, projId);
            let userAfterPreferences = state.userById[state.loggedIn.id];
            return {
                users: [state.users],
                userById: state.userById,
                loggedIn: userAfterPreferences,
                courses: state.courses,
            }
        default:
            return state;
    }
}