const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let LocationSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    coordinates:{
        type: [Number, Number],
        index: '2d'
    },
    user_id:{type: mongoose.Schema.Types.ObjectId, ref:'User'}
    
});


module.exports = mongoose.model('Location', LocationSchema);