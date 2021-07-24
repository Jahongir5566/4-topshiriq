const Joi = require('joi');
const mongoose = require('mongoose');
const { categorySchema } = require('./categoreis')

const Course = mongoose.model('Courses', new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true,
        minlenght: 5,
        maxlenght: 15
    },
    category: {
            type: categorySchema,
            required: true
    },
    trainer:{
        type: String,
        required: true
    },
    tags:{
        type: [String]
    },
    status:{
        type: String,
        enum: ['Activ', 'Inactiv'],
        required:true
    }
}));

// const Course = mongoose.model('Course', courseSchema);

function validateCourse(course){
    const schema = Joi.object({ 
        title : Joi.string().min(3).max(50).required(),
        categoryId: Joi.string().required(),
        trainer: Joi.string().required(),
        status: Joi.string().required(),
        tags: Joi.array().items(Joi.string())
    })
    return schema.validate(course);
}




exports.Course = Course;
exports.validate = validateCourse;