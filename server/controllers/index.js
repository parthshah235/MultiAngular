let passport = require("passport");

// enable jwt
let jwt = require('jsonwebtoken');
let DB = require('../config/db');

// create the User Model instance
let userModel = require('../models/user');
let User = userModel.User; // alias

module.exports.processLoginPage = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        // if server error
        if (err) {
            return res.json({success: false, msg: 'Authentication Error!'});
        }
        // if there is a user login error
        if (!user) {
            return res.json({success: false, msg: 'Authentication Error!'});
        }
        req.login(user, (err) => {
            console.log(err)
            // server error
            if (err) {
                return res.json({success: false, msg: 'Authentication Error!'});
            }

            // create payload
            const payload = {
                id: user._id,
                displayName: user.displayName,
                username: user.username,
                email: user.email,
                isAdmin: user.isAdmin
            }

            // sign the payload
            const authToken = jwt.sign(payload, DB.Secret, {
                expiresIn: 604800  // 1 week
            });

            console.log("UserID: " + user._id);
            /* Getting ready to convert API*/
            return res.json({success: true, msg: 'User Logged in Successfully!', user: {
                    _id: user._id,
                    displayName: user.displayName,
                    username: user.username,
                    email: user.email,
                    isAdmin: user.isAdmin
                }, token:  authToken});
        });
    })(req, res, next);
}

module.exports.processRegisterPage = (req, res, next) => {
    // instantiate a user object
    console.log("process registration page")

    let newUser = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        displayName: req.body.displayName,
        isAdmin: false
    });


    User.register(newUser, req.body.password, (err) => {
        if (err) {
            res.json({success: false, msg: 'Registration Error: User Already Exist!'});
        } else {
            res.json({success: true, msg: 'User Registered Successfully!'});
        }
    })
}

module.exports.displayEditRegistrationPage = (req, res, next) => {
    let id = req.params.id;

    User.findById(id, (err, profileToEdit) => {
        if(err){
            console.log(err);
            res.json({success: false, msg: 'User does not Exist!'});
        } else {
            // show the edit view
            res.json({success: true, msg: 'User Logged in Successfully!', user: profileToEdit});

        }
    });
}

module.exports.processEditRegistrationPage = (req, res, next) => {
    let id = req.params.id;
    let updatedUser = User({
        "_id": id,
        "username": req.body.username,
        "password": req.body.password,
        "email": req.body.email,
        "displayName": req.body.displayName,
        "isAdmin": req.body.isAdmin || false
    });

    User.updateOne({_id: id}, updatedUser, (err) => {
        if(err){
            console.log(err);
            res.json({success: false, msg: 'Error while updating!'});
        } else {
            // refresh the book list
            res.json({success: true, msg: 'Successfully Edited User Profile', book: updatedUser});
        }
    });
}

module.exports.changePassword = (req, res, next) => {
    let id = req.params.id;
    let oldPassword = req.body.old_password;
    let newPassword = req.body.password;

    User.findById(id, (err, profileToEdit) => {
        if(err){
            console.log(err);
            res.json({success: false, msg: 'User does not Exist!'});
        } else {
            profileToEdit.changePassword(oldPassword, newPassword, err => {
                if (err)
                    res.json({success: false, msg: err})
                else
                    res.json({success: true, msg: 'User Logged in Successfully!'});
            })
        }
    });
}

module.exports.performLogout = (req, res, next) => {
    req.logout();
    res.json({success: true, msg: 'User successfully Logged out!'});
}

