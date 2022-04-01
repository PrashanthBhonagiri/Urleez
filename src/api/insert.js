const express = require('express');
const db = require('../db/connection');
const Joi = require('joi');
require("dotenv").config();

const urleezCollection = db.get('urleez');
const router = express.Router();

const schema = Joi.object({
    alias : Joi.string()
        .alphanum()
        .trim()
        .required(),
    
    longUrl : Joi.string()
        .regex(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/)
        // .pattern(new RegExp('/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/'))
        .required(),

    desc : Joi.string()
        .trim()
        .min(3)
        .max(100)
        .required(),

    isActive : Joi.bool(),

    successfulHits : Joi.number()
        .integer(),
    
    unSuccessfulHits : Joi.number()
        .integer(),
    
    teamSlug : Joi.string()
        .required(),
        
    channelSlug : Joi.string()
        .required(),
    
});

router.post('/', async(req,res) => {
    console.log(req.body);
    const result = schema.validate(req.body);
    console.log(result);
    if(!result.error) {
        const urlData = {
            ...req.body,
            // add user info who is adding this url
            miniUrl : req.body.teamSlug + req.body.channelSlug + req.body.alias,

        }
        console.log(urlData);
        // insert into db

        urleezCollection
            .insert(urlData)
            .then((createdUrl) => {
                console.log("successful");
                res.json(createdUrl)
            });
    } else {
        console.log("else error");
        const error = new Error(result.error);
        res.status(422);
        res.json("error")
        // use next error instead ... 
    }
});

module.exports = router;