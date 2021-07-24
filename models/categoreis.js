const mongoose = require('mongoose');
const Joi = require('joi');

const categorySchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlenght: 5,
        maxlenght: 15
    }
});



function validateCategory(category){
    const schema = Joi.object({ 
        name : Joi.string().min(3)
    })
    return schema.validate(category);
}


const Category = mongoose.model('Category', categorySchema);

exports.validate = validateCategory;
exports.Category = Category;
exports.categorySchema = categorySchema;