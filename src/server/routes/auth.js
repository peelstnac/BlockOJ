const { Router } = require('express');
const { query, transact } = require('../database');

const bcrypt = require('bcrypt');

const router = Router();
const saltRounds = 10;

router.get('/logout', (req, res) => {
	req.session.destroy();
	res.redirect('/');
});

router.get('/login', ({ session }, res) => {
	// No need to login again
	if (session.auth) res.redirect('/');
	else res.render('pages/login');
});

router.post('/login', async (req, res) => {
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

router.get('/register', ({ session }, res) => {
	// No need to register again if already logged in
	// FIXME Not sure if we need the else? Idk if express stops the
	// function as soon as we call redirect or whatever
	if (session.auth) res.redirect('/');
	else res.render('pages/register');
});

router.post('/register',  (req, res) => {
	const { username, password } = req.body;
	req.body = {};

	bcrypt.hash(password, saltRounds, async (err, hash) => {
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

module.exports = router;