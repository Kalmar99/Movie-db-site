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

    if(req.user) {
        const name = req.body.name
        const image = req.body.image
        const stars = req.body.stars
        const description = req.body.description
        const year = req.body.year
        db.createMovie(name,stars,year,description,image,null)

        res.status(201)
        res.send()
        return;
    }

    res.status(401).send()

})

router.put('/api/movies/:name',(req,res) => {

    const oldName = req.params['name'];

    if(req.user) {
        
        const name = req.body.name
        const image = req.body.image
        const stars = req.body.stars
        const description = req.body.description
        const year = req.body.year
        const reviews = req.body.reviews

        if(db.deleteMovie(oldName)){
            db.createMovie(name,stars,year,description,image,reviews)
            res.status(204).send()
            return;
        } else {
            res.status(404).send()
            return;
        }
    }
    res.status.send(401).send()
    
})

router.delete('/api/movies/:name',(req,res) => {
    
    const name = req.params['name']

    if(name) {
        if(req.user) {
            
            if(db.deleteMovie(name)) {
                res.status(204).send()
                return;
            }
            res.status(404).send()
            return;
        }
        res.status(401).send()
        return;
    }
    res.status(400).send()
    return;
    

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