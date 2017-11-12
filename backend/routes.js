/**
 * Created by nishavaity on 11/10/17.
 */
const { passport } = require('./auth.js');
const { UserModelApi } = require('./models.js');

const isAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()) {
        next();
    } else {
        res.send({status: 401});
    }
};

const routes = (app) => {
    app.post("/login",
        passport.authenticate('local-login'),
        (req, res) => {
            res.send({isAuthenticated: true, user: req.user });
        });

    app.get("/user",
        isAuthenticated,
        (req, res) => res.send({user: req.user})
    );

    app.get("/login",
        (req, res) => {
            res.send('you are not logged in');
        });

    app.post("/logout", isAuthenticated, (req, res) => {
        req.logout();
        res.send({ status: 200 });
    });
    app.get("/authenticate", isAuthenticated, (req, res) => res.send({ status: 200 }));

    app.put("/updateUser", isAuthenticated , (req, res) => {
        const user = req.user;
        const updatedUser = req.body.body;
        const userUpdated = UserModelApi.updateUser(updatedUser.id, updatedUser);
        if(userUpdated)
            res.send({ status: 200, user: userUpdated});
        else
            res.send({ status: 200, user: null});
    });
};

module.exports = {
    routes
};
