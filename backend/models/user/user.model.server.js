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
}
const mongoose = require("mongoose");
const UserSchema = require("./user.schema.server")();
const UserModel = mongoose.model("UserModel", UserSchema);

UserModelApi = {
    createUser: (user) => createUser(user),
    signUpUser: (user) => signUpUser(user),
    findOne: (id) => findUser(id),
    getUsers: () => getUsers(),
    findUserById: (_id) => findUser(_id),
    // findUserByUserName: (userName) => UserModel.findOne({ userName }),
    findUserByCredentials: (userName, password) => findUserByCreds({ userName, password }),
    updateUser: (_id, user) => updateUser({ _id }, user),
    addPreference: (uid, prefId, pid) => addPreference(uid, prefId, pid),
    uploadFile: (req, res) => uploadFile(req, res),
};

const createUser = (user) => {
    const userId = state.users.length + 1;
    state.users.push(userId);
    user.id = userId;
    user.token = generateToken();
    console.log(user.token);
    const newUser = user;
    state.userById[userId] = newUser;
    return newUser;
};

const signUpUser = (user) => {
    const userEmail = user.email;
    const userToken = user.token;
    let res = undefined;
    res = Object.keys(state.userById).filter(function(key){
        return (state.userById[key].email === userEmail && state.userById[key].token === userToken);
    });
    return state.userById[Number(res[0])];
};

const updateUser = (id, user) => {
    const uid = id;
    const updatedUser = user;
    state.userById[uid] = updatedUser;
    return updatedUser;
};

const getUsers = () => {
    return state.userById;
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
const addPreference = (uid, prefId, pid) => {
    const projId = pid;
    state.userById[uid].projectPreferences.splice(prefId-1, 1, projId);
    let userAfterPreferences = state.userById[uid];
    return userAfterPreferences;
}

const generateToken = () => {
    const stringLength = 8;
    const stringArray = ['0','1','2','3','4','5','6','7',
    '8','9','a','b','c','d','e','f','g','h','i','j','k',
    'l','m','n','o','p','q','r','s','t','u','v','w','x',
    'y','z','A','B','C','D','E','F','G','H','I','J','K',
    'L','M','N','O','P','Q','R','S','T','U','V','W','X',
    'Y','Z','!','?'];
    let token = "";
    for (let i = 1; i < stringLength; i++) {
        let rndNum = Math.ceil(Math.random() * stringArray.length) - 1;
        token = token + stringArray[rndNum];
    }
    return token;
};

module.exports = {
    UserModelApi,
};
