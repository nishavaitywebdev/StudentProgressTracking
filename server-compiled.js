'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var _require = require('./backend'),
    initiate = _require.initiate;

var cookieParser = require('cookie-parser');
var session = require('express-session');

var passport = require('passport');

app.set('port', process.env.PORT || 5000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));
app.listen(app.get('port'));

app.use(session({
    secret: 'this is the secret',
    resave: true,
    saveUninitialized: true
}));

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

initiate(app);
app.listen();

//# sourceMappingURL=server-compiled.js.map