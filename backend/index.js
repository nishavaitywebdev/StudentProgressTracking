/**
 * Created by nishavaity on 11/10/17.
 */
const { authenticate } = require('./auth.js');
const { services } = require('./app.js');

const initiate = (app) => {
    authenticate(app);
    services(app);
};

module.exports = {
    initiate,
};
