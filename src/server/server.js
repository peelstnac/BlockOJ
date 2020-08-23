// test users: username(test); password(test) and username(hackthe6ix) password(@990wdpojz_)
'use strict';
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');

const bcrypt = require('bcrypt');
const session = require('express-session');
const { v4: uuidv4 } = require('uuid');

const { query, transact } = require('./database');


if (process.env.NODE_ENV !== 'PRODUCTION') {
    require('dotenv').config();
}

// Dev gate
if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    session.cookie.secure = true // serve secure cookies
}

// Mount session store
app.use(session({
    store: new (require('connect-pg-simple')(session))(),
    secret: process.env.FOO_COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
    genid: uuidv4,
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({
    extended: true
}));

app.use(funcion (req, res) {

});

app.get('/', (req, res) => {
    if (req.session.auth) res.sendFile('index.html');
    else res.redirect('/login');
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

app.get('/login', (req, res) => {
    // No need to login again
    if (req.session.auth) res.redirect('/');
    else res.sendFile('pages/login.html');
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    req.body = {};

    // Search for the user
    const queryString = 'SELECT password FROM users WHERE username=$1';
    const params = [ username ];

    try {
		const rows = await query(queryString, params);
		if (!rows) {
			// TODO Flash message
			console.log("DEBUG: The username does not exist.");
			res.redirect('/login');
		} else {
			const hash = rows[0].password;
			bcrypt.compare(password, hash, (err, verdict) => {
				if (err) {
					console.log(err);
					res.redirect('/login');
				} else {
					if (!verdict) {
						res.redirect('/login');
					} else {
						// Successful login
						req.session.auth = true;
						res.redirect('/');
					}
				}
			});
		}
	} catch (err) {
		console.error("ERROR: Something went wrong with query for username.", err);
		res.redirect('/login');
	}
});

app.get('/register', (req, res) => {
    // No need to register again if already logged in
	// FIXME Not sure if we need the else? Idk if express stops the
	// function as soon as we call redirect or whatever
    if (req.session.auth) res.redirect('/');
    else res.sendFile('pages/register.html');
});

const saltRounds = 10;

app.post('/register',  (req, res) => {
    const { username, password } = req.body;
    req.body = {};
    const hash = bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
            console.log(err);
            res.redirect('/register');
        } else {
            // SQL Query
            const queryString = 'INSERT INTO users(username, password) VALUES($1, $2)';
            const params = [username, hash];

			try {
				await transact(queryString, params);
				// Register successful
				console.log("DEBUG: register successful");
				res.redirect('/login');
			} catch (err) {
				console.log("DEBUG: repeat username or bogus username/password (exceeds 50 chars)");
				res.redirect('/register');
			}
        }
    });
});

app.listen(PORT, function () {
	console.log(`Listening on http://localhost:${PORT}`);
});
