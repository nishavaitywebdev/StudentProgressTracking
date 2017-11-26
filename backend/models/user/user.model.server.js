/**
 * Created by nishavaity on 11/10/17.
 */

//const state = {
//    users: [1, 2, 3, 4, 5, 6],
//    userById: {
//        1: { id: 1, firstname: "Nisha", lastname: "Vaity", email: "nisha@gmail.com", username: "nisha", password:"nisha",
//            role: "student", aboutMyself: "", coursesCompleted: [], projectPreferences: [] },
//        2: { id: 2, firstname: "Rajiv", lastname: "Krishnan", email: "rajiv@gmail.com", username: "rajiv", password:"rajiv", role: "student",
//            aboutMyself: "", coursesCompleted: [], projectPreferences: [] },
//        3: { id: 3, firstname: "Admin", lastname: "Admin", email: "admin@gmail.com", username: "admin", password:"admin", role: "admin",
//            aboutMyself: "", coursesCompleted: [], projectPreferences: [] },
//        4: { id: 4, firstname: "Faculty", lastname: "Faculty", email: "Faculty@gmail.com", username: "Faculty", password:"Faculty", role: "faculty",
//            aboutMyself: "", coursesCompleted: [], projectPreferences: [] },
//        5: { id: 5, firstname: "Sponsor", lastname: "Sponsor", email: "Sponsor@gmail.com", username: "Sponsor", password:"Sponsor", role: "sponsor",
//            aboutMyself: "", coursesCompleted: [], projectPreferences: [] },
//        6: { id: 6, firstname: "Abhisha ", lastname: "Vaity", email: "abhisha@gmail.com", username: "abhisha", password:"abhisha", role: "student",
//            aboutMyself: "", coursesCompleted: [], projectPreferences: [] },
//    },
//}

const { mongoose } = require('../database.js');
const { UserSchema } = require("./user.schema.server.js");
const UserModel = mongoose.model("UserModel", UserSchema);

UserModelApi = {
    createUser: (user) => createUser(user),
    signUpUser: (user) => signUpUser(user),
    findOne: (id) => findUser(id),
    getUsers: () => getUsers(),
    findUserById: (_id) => findUser(_id),
    findUserByCredentials: ({username, password}) => findUserByCredentials({username, password}),
    updateUser: (_id, user) => updateUser(_id, user),
    addPreference: (uid, prefId, pid) => addPreference(uid, prefId, pid),
    setModel: (model) => setModel(model),
    deleteUser: (id) => deleteUser(id),
};
const setModel = (_model) => {
    model = _model;
};
const createUser = (user) => {
    return UserModel.create(user);
};
const signUpUser = (user) => {
    const userEmail = user.email;
    const userToken = user.token;
    return UserModel.findOne({
        email:userEmail,
        token:userToken
    });
};
const updateUser = (id, user) => {
    return UserModel.update(
        {
            _id: id
        },
        {
            $set:user
        }
    );
};
const getUsers = () => {
    return UserModel.find();
};

const findUser = (uid) => {
    return UserModel.findOne({
       _id: uid
    });
};
const deleteUser = (userId) => {
    return UserModel.remove({
        _id: userId
    })
};
const findUserByCredentials = ({username, password}) => {
    return UserModel.findOne({username, password});
};
const addPreference = (uid, prefId, pid) => {
    let user = findUser(uid);
    let preferences = user.projectPreferences;
    preferences.splice(prefId-1, 1, pid);
    user.projectPreferences = preferences;
    return UserModel.update(
        {
            _id: uid
        },
        {
            $set:user
        }
    );
};

module.exports = {
    UserModelApi,
};
