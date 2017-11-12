/**
 * Created by nishavaity on 11/10/17.
 */
const { routes } = require('./routes.js');
const { authenticate } = require('./auth.js');

const initiate = (app) => {
    authenticate(app);
    routes(app);
};

module.exports = {
    initiate,
};
