const mongoose = require('mongoose');
const Users = require('../../models/user/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.registerUser = (req, res, next) => {
    Users.find({userEmail: req.body.userEmail})
    .exec()
    .then(user => {
        if(user.length >=1) {
            return res.status(409).json(
               "This email is exit"
            );
        } else {
            bcrypt.hash(req.body.userPassword, 10, (err, hash) => {
                if(err) {
                    return res.status(500).json({
                        error: err
                    });
                } else {
                    const user = new Users({
                        _id: new mongoose.Types.ObjectId(),
                        userName: req.body.userName,
                        userEmail: req.body.userEmail,
                        userPassword: hash
                    });
                    user
                    .save()
                    .then(result => {
                        console.log(result);
                        res.status(201).json({
                            message: 'Data successfully is added'
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(400).json({
                            error: err
                        });
                    });
                }
            });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

exports.loginUser = (req, res, next) => {
    Users.find({userEmail: req.body.userEmail})
    .exec()
    .then(user => {
        if(user.length < 1) {
            return res.status(401).json({
                message: "Authentication failed"
            });
        }
        bcrypt.compare(req.body.userPassword, user[0].userPassword, (err, result) => {
            if(err) {
                return res.status(401).json({
                    message: "Authentication failed"
                });
            }
            if(result) {
                const token = jwt.sign(
                    {
                        userName: user[0].userName,
                        userID: user[0]._id,
                        userRoll: 'User'
                    },
                    process.env.JWT_KEY,
                    {
                        expiresIn: "15m"
                    }
                );
                return res.status(200).send({
                    token: token
                });
            } 
            return res.status(401).json({
                message: "Authentication failed"
            });  
        });
    });
}