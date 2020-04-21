const express = require('express');
const router = express.Router();
const passport = require('passport');
const db = require('./db')


router.post('api/login',passport.authenticate('local'),(req,res) => {
    res.status(204).send();
})

router.post('api/signup',function(req,res) {
    const created = db.createUser(req.body.username,req.body.password)
    if(!created) {
        res.status(400).send();
    } 

    passport.authenticate('local')(req, res, () => {
        req.session.save((err) => {
            if (err) {
               //shouldn't really happen
                res.status(500).send();
            } else {
                res.status(201).send();
            }
        });
    });
})

router.get('api/user',(req,res) => {
    if(req.user) {
        res.json({
            username: req.user.username
        })
    }
    res.status(401).send()
})

module.exports = router;