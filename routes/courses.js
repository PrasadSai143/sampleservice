const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const { Course, validate } = require('../models/course');

router.get('/', async (req, res) =>  {
    const courses = await Course.find().sort('name');
    res.send(courses);
})

router.post('/', async (req, res) =>  {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    let course = new Course({
        name: req.body.name,
        author: req.body.author,
        tags: req.body.tags,
        isPublished: req.body.isPublished,
        price: req.body.price
    });
    course = await course.save();
    res.send(course);
});

router.get('/:id', async(req, res) =>  {
    try{
        var course = await Course.findById(req.params.id);
        if(!course)
            return res.status(404).send('The course with given id not avalable')
        res.send(course);
    }
    catch(ex){
        res.send(ex.message);
    }
})

router.put('/:id', async (req, res) =>  {
    const { error } = validate(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }
    let course = await Course.findByIdAndUpdate(req.params.id,{
        name: req.body.name,
        author: req.body.author,
        tags: req.body.tags,
        isPublished: req.body.isPublished,
        price: req.body.price
    },{new: true});

    if(!course) return res.status(404).send('The course with given id not avalable')

    res.send(course);

})

router.delete('/:id', async(req, res) =>  {
    let course = await Course.findByIdAndRemove(req.params.id)
    if(!course) return res.status(404).send('The course with given id not avalable')
    res.send(course);
})

module.exports = router;