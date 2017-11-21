/**
 * Created by nishavaity on 11/10/17.
 */
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { UserModelApi } = require('./models/user/user.model.server.js');
var session      = require('express-session');

const authenticateLocalUser = (username, password, done) => {
    const user = UserModelApi.findUserByCredentials(username, password);
    if(user) {
        return done(null, user);
    } else {
        return done(null, {});
    }
};

const authenticate = (app) => {

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        const user = UserModelApi.findOne(id);
        if(user){
            return done(null, user);
        } else{
            return done(null, {});
        }
    });

    passport.use('local-login', new LocalStrategy(
        {
            usernameField : 'username',
            passwordField : 'password',
        },
        authenticateLocalUser)
    );
};


module.exports = {
    passport,
    authenticate
};
