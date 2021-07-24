const mongoose = require('mongoose');
const Joi = require('joi');

const customersSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlenght: 5,
        maxlenght: 15
    },
    isVip:{
        type: Boolean,
        default: false   
    },
    phone:{
        type: String,
        required: true,
        minlenght: 7,
        maxlenght: 15
    }
});

const Customer = mongoose.model('Customer', customersSchema);


function validateCustomers(customers){
    const schema = Joi.object({ 
        name : Joi.string().min(5).max(50).required(),
        isVip: Joi.boolean().required(),
        phone: Joi.string().min(7).max(15).required()        
    })
    return schema.validate(customers);
}

exports.Customer = Customer;
exports.validate = validateCustomers;