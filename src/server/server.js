// test users: username(test); password(test) and username(hackthe6ix) password(@990wdpojz_)
'use strict';
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000 || 8000;
const path = require('path');

const bcrypt = require('bcrypt');
const session = require('express-session');
const { v4: uuidv4 } = require('uuid');

const { Pool, Client } = require('pg')
// DB connection
const pool = new Pool();

if (process.env.NODE_ENV !== 'PRODUCTION') {
    require('dotenv').config();
}
// Dev gate
if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true // serve secure cookies
}
// Mount session store
app.use(session({
    store: new (require('connect-pg-simple')(session))(),
    secret: process.env.FOO_COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
    genid: (req) => {
        return uuidv4();
    }
}));

app.use(express.static(path.join(__dirname, 'views')));
app.use(express.urlencoded({
    extended: true
}));

app.get('/', (req, res) => {
    var sess = req.session;
    if (sess.auth) res.sendFile(path.join(__dirname, 'views', 'root.html'));
    else res.redirect('/login');
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

app.get('/login', (req, res) => {
    var sess = req.session;
    // No need to login again
    if (sess.auth) {
        res.redirect('/');
    }
    else res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.post('/login', (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    req.body = {};
    // Search for the user
    const text = 'SELECT password FROM users WHERE username=$1';
    const values = [username];
    pool.query(text, values, (err, r) => {
        if (err) {
            console.log("DEBUG: Something went wrong with query for username");
            res.redirect('/login');
        } else {
            // Does the username exist
            if (r.rows.length == 0) {
                console.log("DEBUG: The username does not exist");
                res.redirect('/login');
            }
            else {
                // Compare password and hash
                var hash = r.rows[0].password;
                bcrypt.compare(password, hash, (err, verdict) => {
                    if (err) {
                        console.log(err);
                        res.redirect('/login');
                    } else {
                        if (verdict == false) {
                            res.redirect('/login');
                        } else {
                            // Successful login
                            var sess = req.session;
                            sess.auth = true;
                            res.redirect('/');
                        }
                    }
                });
            }
        }
    });
});

app.get('/register', (req, res) => {
    // No need to register again if already logged in
    var sess = req.session;
    if (sess.auth) {
        res.redirect('/');
    }
    else res.sendFile(path.join(__dirname, 'views', 'register.html'));
});

const saltRounds = 10;

app.post('/register', (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    req.body = {};
    var hash = bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            console.log(err);
            res.redirect('/register');
        } else {
            // SQL Query
            const text = 'INSERT INTO users(username, password) VALUES($1, $2)';
            const values = [username, hash];
            pool.query(text, values, (err, r) => {
                if (err) {
                    console.log("DEBUG: repeat username or bogus username/password (exceeds 50 chars)");
                    res.redirect('/register');
                } else {
                    // Register successful
                    console.log("DEBUG: register successful");
                    res.redirect('/login');
                }
            });
        }
    });
});

app.listen(PORT, function () {
    console.log(`Listening on http://localhost:${PORT}`);
});
