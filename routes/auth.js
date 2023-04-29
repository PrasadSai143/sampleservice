
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const { User } = require('../models/user');

router.post('/', async (req, res) =>  {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    let user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Invalid email or password.');
     
    const validPasswrod = await bcrypt.compare(req.body.password, user.password);
    if(!validPasswrod) return res.status(400).send('Invalid email or password.');

    const token = user.generateAuthToken();
    
    res.status(200).send(token);

});

function validate(req){
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(1024).required()
    };
    return Joi.validate(req, schema);
}


module.exports = router;