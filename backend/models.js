/**
 * Created by nishavaity on 11/10/17.
 */

const state = {
    users: [1, 2, 3, 4, 5, 6],
    userById: {
        1: { id: 1, firstname: "Nisha", lastname: "Vaity", email: "nisha@gmail.com", username: "nisha", password:"nisha",
            role: "student", aboutMyself: "", coursesCompleted: [], projectPreferences: [] },
        2: { id: 2, firstname: "Rajiv", lastname: "Krishnan", email: "rajiv@gmail.com", username: "rajiv", password:"rajiv", role: "student",
            aboutMyself: "", coursesCompleted: [], projectPreferences: [] },
        3: { id: 3, firstname: "Admin", lastname: "Admin", email: "admin@gmail.com", username: "admin", password:"admin", role: "admin",
            aboutMyself: "", coursesCompleted: [], projectPreferences: [] },
        4: { id: 4, firstname: "Faculty", lastname: "Faculty", email: "Faculty@gmail.com", username: "Faculty", password:"Faculty", role: "faculty",
            aboutMyself: "", coursesCompleted: [], projectPreferences: [] },
        5: { id: 5, firstname: "Sponsor", lastname: "Sponsor", email: "Sponsor@gmail.com", username: "Sponsor", password:"Sponsor", role: "sponsor",
            aboutMyself: "", coursesCompleted: [], projectPreferences: [] },
        6: { id: 6, firstname: "Abhisha ", lastname: "Vaity", email: "abhisha@gmail.com", username: "abhisha", password:"abhisha", role: "student",
            aboutMyself: "", coursesCompleted: [], projectPreferences: [] },
    },
    loggedIn: null,
    courses: {
        1: "Web Development", 2: "Programming Design Paradigm",
        3: "Managing Software Development", 4: "Information Retrieval",
    },
}

UserModelApi = {
    createUser: (user) => createUser(user),
    findOne: (user) => findUser(user.id),
    findUserById: (_id) => findUser(user.id),
    // findUserByUserName: (userName) => UserModel.findOne({ userName }),
    findUserByCredentials: (userName, password) => findUserByCreds({ userName, password }),
    updateUser: (_id, user) => updateUser({ _id }, user),
};

const createUser = (user) => {
    const userId = state.users.length + 1;
    state.users.push(userId);
    user.id = userId;
    const newUser = user;
    state.userById[userId] = newUser;
    return newUser;
};

const updateUser = (id, user) => {
    const uid = id;
    const updatedUser = user;
    state.userById[uid] = updatedUser;
    return updatedUser;
};


const findUser = (uid) => {
    let res = undefined;
    Object.keys(state.userById).forEach(function (key) {
        let user = state.userById[key];
        if(user.id === uid) {
            res = user;
        }
    });
    return res;
};
const findUserByCreds = (u) => {
    let res = undefined;
    Object.keys(state.userById).forEach(function (key) {
        let user = state.userById[key];
        if(user.username === u.userName && user.password === u.password) {
            res = user;
        }
    });
    return res;
};
module.exports = {
    UserModelApi,
};
