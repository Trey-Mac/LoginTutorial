import 'dotenv/config';

import express from 'express';

import pkg from 'express-openid-connect';
const { auth, requiresAuth } = pkg;

const app = express();

app.set('view engine', 'pug');

const port = parseInt(process.env.PORT, 10);

app.use(
    auth({
        authorizationParams:{
            response_type: 'code'
        },
        authRequired: false

    }));

app.use((req, res, next) => {
    res.locals.isAuthenticated = req.oidc.isAuthenticated();
    res.locals.user = req.oidc.user;

    console.log(res.locals);

    next();

});



app.get('/', (req, res) => {
    res.render('index');
});

app.get('/account', requiresAuth(), (req, res) => {
    res.render('account');

});

app.listen(port, () =>{
    console.log(`Listening on port ${port}...`)
});

