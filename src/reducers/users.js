/**
 * Created by nishavaity on 10/23/17.
 */
import * as types from '../../src/constants/ActionTypes';
const initialState = {
    users: [1, 2, 3, 4, 5, 6],
    userById: {
        1: { id: 1, firstname: "Nisha", lastname: "Vaity", email: "nisha@gmail.com", username: "nisha", password:"nisha", role: "student", },
        2: { id: 2, firstname: "Rajiv", lastname: "Krishnan", email: "rajiv@gmail.com", username: "rajiv", password:"rajiv", role: "student", },
        3: { id: 3, firstname: "Admin", lastname: "Admin", email: "admin@gmail.com", username: "admin", password:"admin", role: "admin",},
        4: { id: 4, firstname: "Faculty", lastname: "Faculty", email: "Faculty@gmail.com", username: "Faculty", password:"Faculty", role: "faculty", },
        5: { id: 5, firstname: "Sponsor", lastname: "Sponsor", email: "Sponsor@gmail.com", username: "Sponsor", password:"Sponsor", role: "sponsor", },
        6: { id: 6, firstname: "Abhisha ", lastname: "Vaity", email: "abhisha@gmail.com", username: "abhisha", password:"abhisha", role: "student",},
    },
    loggedIn: null
}

export default function users(state = initialState, action) {
    switch (action.type) {
        case types.ADD_USER:
            const userId = state.users.length + 1;
            const newUser = {...action.user, id: userId};
            return {
                users: [...state.users, userId],
                userById: {...state.userById, newUser},
                loggedIn: state.loggedIn,
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
                    }
                }
            });
            return newstate;
        default:
            return state;
    }
}