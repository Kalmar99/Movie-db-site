const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require("express-session");
const LocalStrategy = require('passport-local').Strategy;
const path = require('path');
const routes = require('./routes');
const db = require('./db')


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    secret: 'a very secret secret',
    resave: false,
    saveUninitialized: false
}))


app.use(express.static('public'))


passport.use(new LocalStrategy (
    {
        usernameField: 'username',
        passwordField: 'password'
    },
    function(username,password,done) {
        const verified = db.verifyUser(username,password)

        if(!verified) {
            return done(null,false,{message: 'Invalid Username / Password'})
        }

        const user = db.getUser(username);
        return done(null,user)
    }
))

passport.serializeUser(function(user,done){
    done(null,user.username)
})

passport.deserializeUser(function(username,done) {
    const user = db.getUser(username)
    
    if(user) {
        done(null,user)
    } else {
        done(null,false)
    }
})

app.use(passport.initialize());
app.use(passport.session());

app.use('/',routes)

app.use((req, res, next) => {
    console.log(req)
    res.sendFile(path.resolve(__dirname, '..', '..', 'public', 'index.html'));
});

module.exports = app;