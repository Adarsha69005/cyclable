const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let UserSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    given_name: {type: String, required: true, max: 100},
    family_name: {type: String, required: true, max: 100},
    email_address: {
        type: String,
         unique: true,
        required: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    proof: {type: String},
    password: {type: String, required: true},
    user_role: {type: String, require: true},
    active: {type:Boolean, default: false},
    created_at: Date,
    updated_at: Date
    
});


module.exports = mongoose.model('User', UserSchema);