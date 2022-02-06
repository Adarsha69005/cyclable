const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const checkAuthentication = require('../middleware/check_authentication');
const Location = require('../models/location_model');


router.post('/add', checkAuthentication, (req,res, next) => {
    const location = req.body;
    const userdata = req.userData

    Location.find({user_id:userdata.user_id}).exec().then(locationdata => {
        if(!Array.isArray(locationdata) || !locationdata.length){
            const addLocation = new Location({
                _id: new mongoose.Types.ObjectId(),
                user_id: userdata.user_id,
                coordinates: [location.latitude,location.longitude]
            });
            addLocation.save()
                .then(result => {
                    console.log(result);
                    res.status(200).json({
                        message:'location added.'
                    })
                    }).catch(error => {
                        res.status(500).json({
                            error: error
                    });
            })
        } else {
            Location.update({user_id:userdata.user_id},{
                $set: {
                    coordinates:[location.latitude,location.longitude]
                }
            }).exec()
            .then(result => {
                res.status(200).json({
                    message:"Location updated"
                })
            }).catch(error => {
                res.status(500).json({
                    error: error
            })
            })
    
        }
    })

});

router.get('/', checkAuthentication, (req,res, next) => {
    const userdata = req.userData;

    Location.find({user_id:userdata.user_id}).exec().then(location => {
        console.log(location);
        res.status(200).json({
            message:"Location",
            location:location[0]
        });
    }).catch(error => {
        res.status(500).json({
            error: error
        });
    });
});

router.get('/all', checkAuthentication, (req,res, next) => {
    const userdata = req.userData;

    Location.find()
    .exec().then(location => {
        console.log(location);
        if(!location.length){
            return res.status(200).json({
                message:"Location Not Found.",
                location: location 
              })
        }else{
            let users_location = location.filter(function(loc){
                return loc.user_id !== userdata.user_id
            })
        
            res.status(200).json({
                message:"User Locations",
                location:users_location
            });
        }
        
    }).catch(error => {
        res.status(500).json({
            error: error
        });
    });
});






module.exports = router;
