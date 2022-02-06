const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const User = require('../models/user_model');
const authentication = require('../middleware/jwt_authentication');
const checkAuthentication = require('../middleware/check_authentication');

router.post('/signup', (req,res, next) => {
    const user = req.body
    User.find({email_address: user.email_address})
        .exec()
        .then(already_user => {
            if(already_user.length >= 1) {
                return res.status(409).json({
                    message:"Email already exists."
                });
            } else {
                const password = bcrypt.hashSync(user.password);
                const userRegister = new User({
                    _id: new mongoose.Types.ObjectId(),
                    given_name: user.given_name,
                    family_name:user.family_name,
                    email_address:user.email_address,
                    password:password,
                    proof:user.proof,
                    user_role: user.user_role,
                    created_at: new Date(),
                    updated_at: new Date()
                });
                userRegister
                    .save()
                    .then(registered_user => {
                        res.status(201).json({
                            message: "User registered successfully.",
                            user_id: registered_user._id
                        });
                    }).catch(error => {
                        res.status(500).json({
                            error: error
                        })
                    });
            }
        });  
    
});

router.post('/login', (req, res, next) => {
    const user = req.body;

    User.find({'email_address':user.email_address})
        .exec()
        .then(registered_user => {
            if(registered_user.length < 1){
                return res.status(401).json({
                    message: "User doesnot exist."
                });
            } else {
                console.log(registered_user[0]);
                if(registered_user[0].user_role === 'client' && registered_user[0].active === true){
                    if(bcrypt.compareSync(user.password, registered_user[0].password)){
                        const token = authentication.jwt.sign({
                            email:registered_user[0].email_address,
                            user_id: registered_user[0]._id,
                            user_role: registered_user[0].user_role
                        },authentication.secret_key);
    
                        res.status(200).json({
                            message: 'User successfully login.',
                            token: token,
                            user_role:registered_user[0].user_role,
                            active:registered_user[0].active,
                            username:registered_user[0].given_name,
                            user_id: registered_user[0]._id
                        })
                    } else {
                        res.status(401).json({
                            message:'Wrong Email or Password.'
                        })
                    }

                } else if(registered_user[0].user_role === 'admin') {
                    if(bcrypt.compareSync(user.password, registered_user[0].password)){
                        const token = authentication.jwt.sign({
                            email:registered_user[0].email_address,
                            user_id: registered_user[0]._id,
                            user_role: registered_user[0].user_role
                        },authentication.secret_key);
    
                        res.status(200).json({
                            message: 'User successfully login.',
                            token: token,
                            user_role:registered_user[0].user_role,
                            active:registered_user[0].active,
                            user_id: registered_user[0]._id
                        })
                    }
                } else {
                    return res.status(401).json({
                        message: "User doesnot have access rights."
                    });
                }
                
            }
        })
        .catch(error => {
            res.status(500).json({
                error: error
            })
        });
})

router.post('/activate', checkAuthentication, (req, res, next) => {
    const activate_user = req.body
    User.update({ _id: activate_user.user_id }, {
        $set: {
            active: activate_user.activate
        }
    }).exec()
      .then(result => {
          console.log('update',result)
        res.status(200).json({
            message:"User activated."
        }) 
      })
      .catch(error => {
        res.status(500).json({
            error: error
        })
    });
    
})

router.post('/profile', checkAuthentication, (req, res, next) => {
    const userdata = req.userData;
    const admin_update = req.body
    User.update({ _id: userdata.user_id }, {
        $set: {
            given_name:admin_update.given_name,
            family_name:admin_update.family_name
        }
    }).exec()
      .then(result => {
          console.log('update',result)
        res.status(200).json({
            message:"Admin Profile Updated.",
            success:true
        }) 
      })
      .catch(error => {
        res.status(500).json({
            error: error
        })
    });
    
})

router.get('/', checkAuthentication, (req, res, next) => {
    
    User.find()
      .select('_id given_name family_name email_address user_role')
      .exec()
      .then(get_user => {
          if(get_user.length <= 0){
            res.status(404).json({
                message:"User Not Found",
            })
          }
        res.status(200).json({
            message:"User details",
            user: get_user
        })
      })
      .catch(error => {
        res.status(500).json({
            error: error
        })
    });
    
})

router.get('/:user_id', checkAuthentication, (req, res, next) => {
    const user_id = req.params.user_id;
    User.find({ _id: user_id }).exec()
      .then(get_user => {
          if(get_user.length <= 0){
            res.status(404).json({
                message:"User Not Found",
            })
          }
          const user = {
              user_id:get_user[0]._id,
              given_name: get_user[0].given_name,
              family_name: get_user[0].family_name,
              email_address: get_user[0].email_address,
              user_role:get_user[0].user_role,
              proof:get_user[0].proof,
              active: get_user[0].active
          }
        res.status(200).json({
            message:"User details",
            user: user
        })
      })
      .catch(error => {
        res.status(500).json({
            error: error
        })
    });
    
})

router.delete('/:user_id', checkAuthentication, (req, res, next) => {
    const user_id = req.params.user_id;
    User.remove({ _id: user_id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: "User Deleted Successfully."
            })
        }).catch(error => {
            res.status(500).json({
                error: error
            })
        });
    
})



module.exports = router;
