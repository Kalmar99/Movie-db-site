const express = require('express');
const router = express.Router();
const passport = require('passport');
const db = require('./db')


router.post('/api/login',passport.authenticate('local'),(req,res) => {
    res.status(204).send();
})

router.post('/api/logout',function(req,res) {
    req.logOut()
    res.status(204).send()
})

router.post('/api/signup',function(req,res) {

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

router.get('/api/user',(req,res) => {
    if(req.user) {
        res.json({
            username: req.user.username
        })
    }
    res.status(401).send()
})

router.get('/api/movies',(req,res) => {

    const movies = db.getAllMovies();
    
    res.json(movies)
    
}) 

router.post('/api/movies',(req,res) => {

    console.log('user')

    if(req.user) {
        console.log(req.body)
        const name = req.body.name
        const image = req.body.image
        const stars = req.body.stars
        const description = req.body.description
        const year = req.body.year
        db.createMovie(name,stars,year,description,image,null)
        console.log('movie created: ' + name + ' ' + year)
        res.status(201)
        res.send()
        return;
    }

    res.status(401).send()

})

router.get('/api/movies/:name',(req,res) => {
    
    const movie = db.getMovie(req.params['name'])
    if(!movie) {
        res.status(404)
        res.send()
    } else {
        res.json(movie)
    }
})

module.exports = router;