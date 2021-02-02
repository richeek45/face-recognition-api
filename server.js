const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'Richeek45',
        database: 'smart_brain'
    }
});

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get('/profile/:id', profile.handleProfileGet( db));
app.post('/signin', signin.handleSignin( db, bcrypt) );
app.post('/register',  register.handleRegister( db, bcrypt));
app.put('/image', image.handleImage( db));
app.post('/imageUrl',(req, res) => image.handleApiCall( req, res));

app.listen(3000, () => {
    console.log("This app is running on port 3000");
})


// bcrypt.hash("bacon", null, null, function(err, hash) {
//     // Store hash in your password DB.
// });

// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });