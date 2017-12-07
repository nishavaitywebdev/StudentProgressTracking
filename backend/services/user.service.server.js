const multer = require('multer');
const storage = multer.diskStorage({
  destination: __dirname+'/../uploads',
});
const upload = multer({storage});
const nodeMailer = require('nodemailer');
const { passport } = require('../auth.js');
const { postMessageOnSlackGroup } = require('../slack-api.js');
var backup = require('mongodb-backup');

const isAuthenticated = (req, res, next) => {
    if(req.isAuthenticated) {
        next();
    } else {
        res.send({status: 401});
    }
};
const loggedInAndSelf = (req, res, next) => {
    const loggedIn = req.isAuthenticated;
//    const self = (""+req.user._id) === req.body._id;
    if(loggedIn){
        next();
    }else{
        res.send("You are not the same person.");
    }
};
const login = (req, res) => {
    if(Object.keys(req.user).length === 0)
        res.send({isAuthenticated: false, user: null });
    else
        res.send({isAuthenticated: true, user: req.user });

};
const checkLogin = (req, res) => {
    res.send(req.isAuthenticated ? req.user :  '0');
};
const findUser = (req, res) => {
    res.send({ status: 200, user: req.user});
};
const signupUser = (req, res) => {
    const user = req.body;
    model.userModel.signUpUser(user)
    .then((newUser) => {
        res.send({ status: 200, user: newUser});
    })
    .catch((error) => res.send({ status: 200, user: null }));
};
const deleteUser = (req, res) => {
    const id = req.params.userId;
    model.userModel.findUserById(id)
     .then(user => {
        user.projectPreferences.forEach((pid) => {
            model.projectModel.findProjectById(pid)
            .then((project) => {
                const ind = project.preferredBy.indexOf(id);
                project.preferredBy.splice(ind, 1);
                model.projectModel.updateProject(project._id, project)
                .then((project) => {
                });
            });
        });
        model.userModel.deleteUser(id)
        .then(() => getAllUsers(req, res));
     });
};
const updateUser = (req, res) => {
    const user = req.body;
    model.userModel.updateUser(user._id, user)
    .then((userUpdated) => {
        res.send({ status: 200, user: user});
    })
    .catch((error) => res.send({ status: 200, user: null}));
};
const createUser = (req, res) => {
   const user = req.body;
   user["token"] = generateToken();
   model.userModel.createUser(user)
   .then((newUser) => {
       res.send({ status: 200, user: newUser});
   })
   .catch((error) =>  res.send({ status: 200, user: null}));
};

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
const addPreference = (req, res) => {
    const obj = req.body;
    model.userModel.findUserById(obj.uid)
    .then((user) => {
        let preferences = user.projectPreferences;
        preferences.splice(obj.prefId-1, 1, obj.pid);
        user.projectPreferences = preferences;
        model.userModel.updateUser(user._id, user)
        .then((userUpdated) => {
            res.send({ status: 200, user: user})
        })
        .catch((err) => res.send({ status: 200, user: null}));
    });
};
const checkAdmin = (req, res) => {
    const loggedIn = req.isAuthenticated;
    const isAdmin = req.user.role == 'ADMIN';
    if(loggedIn && isAdmin)
        res.send(req.user);
    else
        res.send('0');
};
const logout = (req, res) => {
    req.logout();
    res.send({ status: 200 });
};
const getAllUsers = (req, res) => {
    model.userModel.getUsers()
    .then((users) => {
        res.send({ status: 200, users: users});
    });
};
const findUserById = (req, res) => {
     const id = req.params.userId;
     model.userModel.findUserById(id)
     .then(user => {
        res.send({ status: 200, user: user})
     });
};
const postOnSlack = (req, res) => {
    const message = req.body;
    const response = postMessageOnSlackGroup(message.channel, message.text);
    if(response)
        res.send({ status: 200, response: response});
    else
        res.send({ status: 200, response: null});
};
const uploadResume = (req, res) => {
    const myFile        = req.file;
    const userId        = req.params.id;
    const originalname  = myFile.originalname; // file name on user's computer
    const filename      = myFile.filename;     // new file name in upload folder
    const path          = myFile.path;         // full path of uploaded file
    const destination   = myFile.destination;  // folder where file is saved to
    const size          = myFile.size;
    const mimetype      = myFile.mimetype;
    model.userModel.findUserById(userId)
    .then((user) => {
        user["url"] = "/../uploads/" + filename;
        user["origFileName"] = originalname;
        model.userModel.updateUser(userId, user)
        .then((uuser) => {
            res.send({ status: 200, user: user});
        })
        .catch((err) => {
            res.send({ status: 200, err: error});
        });
    });
};
const downloadResume = (req, res) => {
    model.userModel.findUserById(req.params.id)
    .then((user) => {
        const url = user["url"];
        res.download(__dirname+url, user.origFileName);
    });
};
const backUpDatabase = (req, res) => {
    const connectionString = process.env.MONGODB_URI;
    const backUpFileName = Date.now()+'dump.tar';
    backup({
        uri: connectionString,
        root: __dirname+'/../backup',
        tar: backUpFileName,
        callback: function(err) {
            if (err) {
                res.send({ status: 400, err: error});
            } else {
                res.download(__dirname+'/../backup/'+backUpFileName, 'backupFile.tar');
            }
        }
    });
};
const userService = (app, model) => {
    app.post('/api/login', passport.authenticate('local-login'), (req, res) => login(req, res));
    app.post('/api/checkLogin', (req, res) => checkLogin(req, res));
    app.post('/api/checkAdmin', (req, res) => checkAdmin(req, res));
    app.post('/api/logout', isAuthenticated, (req, res) => logout(req, res));
    app.get('/api/getAllUsers', isAuthenticated, (req, res) => getAllUsers(req, res));
    app.get('/authenticate', isAuthenticated, (req, res) => res.send({ status: 200 }));
    app.get('/api/user', isAuthenticated, (req, res) => findUser(req, res));
    app.get('/api/user/:userId', isAuthenticated, (req, res) => findUserById(req, res));
    app.post('/api/user', isAuthenticated, (req, res) => createUser(req, res));
    app.put('/api/user', loggedInAndSelf, (req, res) => updateUser(req, res));
    app.put('/api/signup', isAuthenticated, (req, res) => signupUser(req, res));
    app.put('/api/addPreference', isAuthenticated , (req, res) => addPreference(req, res));
    app.post('/api/postOnSlack', isAuthenticated, (req, res) => postOnSlack(req, res));
    app.post('/api/resumeUpload/:id', isAuthenticated, upload.single('myFile'), (req, res) => uploadResume(req, res));
    app.get('/api/resumeDownload/:id', isAuthenticated, (req, res) => downloadResume(req, res));
    app.get('/api/backupDatabase', isAuthenticated, (req, res) => backUpDatabase(req, res));
    app.delete('/api/user/:userId', loggedInAndSelf, (req, res) => deleteUser(req, res));
};
module.exports = {
    userService
};