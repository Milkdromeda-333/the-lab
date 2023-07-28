const express = require('express');
const session = require('express-session');
const passport = require('passport');
const morgan = require('morgan');
const bcrypt = require('bcrypt');
const flash = require('express-flash');
const PORT = 3000;
const initializePassport = require('./config/passport');
const { isAuthenticated, isNotAuthenticated } = require('../middleware/auth');


const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set('view-engine', 'ejs');
app.use(morgan('dev'));
app.use(flash());
app.use(passport.initialize()); // stes up passport


app.use(session({
    secret: 'bhsb sbvbNGirnbvnv mJBGJK?Vgbe', // signs the cookie
    cookie: {
        maxAge: 1000 //* 60 * 60 * 24, // 24 hours
    }, // sets cookie options in for the header
    resave: false, // resave even if the cookie data hasn't changed
    saveUninitialized: false, // save when session is 'new but not modified'
}));

app.use(passport.session()); // persists sesssions || acts as a middleware to alter the req object and change the 'user' value that is currently the session id (from the client cookie) into the true deserialized user object.

const users = [];

initializePassport(
    passport,
    (username) => users.find(user => user.username === username),
    id => users.find(user => user.id === id)
);

app.route('/')
    .get(isAuthenticated, (req, res) => {
        res.render('index.ejs', { name: req.user.username });
    });

app.route('/login')
    .get(isNotAuthenticated, (req, res) => {
        res.render('login.ejs');
    });

app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

app.route('/register')
    .get(isNotAuthenticated, (req, res) => {
        res.render('register.ejs');
    })
    .post(async (req, res) => {
        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            users.push({
                username: req.body.username,
                password: hashedPassword,
                id: Date.now()
            });
            res.redirect('/login');
        } catch (err) {
            console.log(err);
            res.redirect('/register');
        }
        console.log(users);
    });

app.use(function (err, req, res, next) {
    if (err) {
        console.log(err);
        res.status(500).send('Sorry there was an error.');
    }
});

app.listen(PORT, () => {
    console.log(`Server listening at url: http://localhost:${PORT}`);
});