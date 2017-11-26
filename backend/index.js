/**
 * Created by nishavaity on 11/10/17.
 */
const { routes } = require('./routes.js');
const { authenticate } = require('./auth.js');
const { services } = require('./app.js');

const initiate = (app) => {
    authenticate(app);
    services(app);
//    routes(app);
};

module.exports = {
    initiate,
};
