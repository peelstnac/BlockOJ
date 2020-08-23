const path = require('path');
const sassMiddleware = require('node-sass-middleware');
const { v4: uuidv4 } = require('uuid');

const { pool } = require('./database');
const authRouter = require('./routes/auth');

const session = require('express-session');
const express = require('express');
const app = express();


const PORT = process.env.PORT || 3000;
const DEV = process.env.NODE_ENV !== 'PRODUCTION'


if (DEV) {
    require('dotenv').config();
}

// region Express configuration

// Dev gate
if (app.get('env') === 'production') {
	app.set('trust proxy', 1); 		// Trust first proxy
	session.cookie.secure = true; 	// Serve secure cookies
}

// Set Pug as templating engine
app.set('views', path.join(__dirname, '..', 'views'));
app.set('view engine', 'pug');

// Static file server middleware
app.use(express.static(path.join(__dirname, '../..', 'public')));

app.use(express.urlencoded({
    extended: true
}));

// SASS Server
app.use(sassMiddleware({
	src: path.join(__dirname, '..'),
	dest: path.join(__dirname, '../..', 'public'),
	debug: DEV,
}));

// Mount session store
app.use(session({
	store: new (require('connect-pg-simple')(session))(),
	secret: process.env.FOO_COOKIE_SECRET,
	resave: false,
	saveUninitialized: false,
	cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
	genid: uuidv4,
	// pool,
}));

// endregion

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/code', (req, res) => {
    res.render('pages/code');
});

app.use('/', authRouter);

app.listen(PORT, function () {
	console.log(`Listening on http://localhost:${PORT}`);
});
