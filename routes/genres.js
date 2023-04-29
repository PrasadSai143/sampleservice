const mongoose = require('mongoose');
const express = require('express');
const auth = require('../middleware/auth');
const admin = require('../middleware/authorization');
const router = express.Router();
const { Genre, validate } = require('../models/genre');

router.get('/', auth ,async (req, res) =>  {
    const genres = await Genre.find().sort('name');
    res.send(genres);
})

router.post('/', async (req, res) =>  {
   
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    let genre = new Genre({
        name: req.body.name,
    });
    genre = await genre.save();
    res.send(genre);
});

router.get('/:id', async(req, res) =>  {
    try{
        var genre = await Genre.findById(req.params.id);
        if(!genre)
            return res.status(404).send('The genre with given id not avalable')
        res.send(genre);
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
    let genre = await Genre.findByIdAndUpdate(req.params.id,{
        name: req.body.name,
    },{new: true});

    if(!genre) return res.status(404).send('The genre with given id not avalable')

    res.send(genre);

})

router.delete('/:id',[auth, admin], async(req, res) =>  {
    let genre = await Genre.findByIdAndRemove(req.params.id)
    if(!genre) return res.status(404).send('The genre with given id not avalable')
    res.send(genre);
})

module.exports = router;