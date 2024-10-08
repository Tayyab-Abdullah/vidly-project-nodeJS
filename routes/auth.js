const {User} = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('config');
const _ = require('lodash');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

function validate(req) {
    const schema = {
      email: Joi.string().min(5).max(255).email().required(),
      password: Joi.string().min(5).max(255).required()
    };
  
    return Joi.validate(req, schema);
  }

router.post('/', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    let user = await User.findOne({ email: req.body.email });
    if(!user) return res.status(400).send('Invalid email and password....');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('Invalid email and password....');

    const token = user.generateAuthToken();
    res.send(token);

});


module.exports = router;