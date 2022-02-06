const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let ProductSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {type: String, required: true, text: true},
    price: {type: String, required:true, text: true},
    brand: {type: String, required: true, text : true},
    description: {type: String, text : true},
    image: {type: String},
    user_id:{type: mongoose.Schema.Types.ObjectId, ref:'User'},
    created_at: {type:Date},
    updated_at: {type:Date}
    
});

ProductSchema.index({
    title: 'text',
    price: 'text',
    brand: 'text',
    description: 'text'
}, {
    weights: {
        title: 5,
        price: 3,
        brand: 4,
        description: 2
    }
});
// ProductSchema.index({ '$**': 'text'});



module.exports = mongoose.model('Product', ProductSchema);