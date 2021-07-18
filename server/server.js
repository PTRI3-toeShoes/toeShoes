const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');

const dotenv = require('dotenv');
dotenv.config();

const cors = require('cors');
const fetch = require('node-fetch');
const { URL, URLSearchParams } = require('url');
const { getRoutes } = require('get-routes');

const sessionController = require('./controllers/sessionController');
const cookieController = require('./controllers/cookieController');
const signupRouter = require('./routes/signupRoute');
const signinRouter = require('./routes/signinRoute');
const properties = require('./routes/properties');
const addFavsRouter = require('./routes/addFavsRoute');
const getFavsRouter = require('./routes/getFavsRoute');
const queryFavsRouter = require('./routes/queryFavsRouter');
const deleteFavRoute = require('./routes/deleteFavRoute');
const googleOauthRouter = require('./routes/googleOauthRoute');
const similarPropertiesRouter = require('./routes/similarPropertiesRoute');


app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/signup', signupRouter);

app.use('/googlelogin', googleOauthRouter);

app.use('/signin', signinRouter);

app.use('/properties', properties);

app.use('/similar', similarPropertiesRouter);

app.use('/addFav', addFavsRouter);

app.use('/getFavs', getFavsRouter);

app.use('/deleteFav', deleteFavRoute);

app.use('/zillowFavQuery', queryFavsRouter);

//check login route
app.use('/checkLogin', /* sessionController.isLoggedIn,*/ (req, res) => {
  return res.status(299).send('user is logged in');
});

// Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error.',
    status: 400,
    message: { err: 'An unknown error occurred.' },
  };
  Object.assign(defaultErr, err);
  return res.status(defaultErr.status).json(defaultErr.message);
});

//listen on 3000
app.listen(3000, () => {
  console.log('Server listening on 3000');
});
