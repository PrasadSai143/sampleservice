const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const Course = mongoose.model('Course', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    author: String,
    tags : [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: Number
})); 


function validateCourse(course){
    console.log(course);
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        author: Joi.string().required(false),
        tags: Joi.array().required(false),
        isPublished: Joi.bool().required(false),
        price: Joi.number().required(false)
    };
    return Joi.validate(course, schema);
}

exports.Course = Course;
exports.validate = validateCourse;