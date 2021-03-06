import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import HouseIcon from '@material-ui/icons/House';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import GoogleIcon from './GoogleIcon';
import api from '../axios/axios';

const fetch = require('node-fetch')

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Rental Evaluator
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(5),
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  googleBtn: {
    margin: theme.spacing(0, 0, 0),
  },
}));

export default function SignIn() {
  const classes = useStyles();

  //state to store input field values
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //submit fxn to make http call to BE
  const handleSubmit = (e) => {
    e.preventDefault();
    api({
      method: 'post',
      url: '/signin',
      data: {
        email,
        password,
      },
    }).then((res) => {
      console.log(res);
      console.log(res.locals.cookie);
      //handle redirect on backend?
      // if (res.status === 200) {
      //   loggedIn();
    });
  };
//**********ADDING IN TEST FUNCTIONS - WHEN DOING PULL REQUEST, DELETE IT AND PUT THE RETURN ON LINE 84*******************
const handleSubmit2 = (e) => {
  e.preventDefault();
  api({
    method: 'post',
    url: '/addFav',
    data: {
      email,
      password,
      favorite: {
        address: "test2",
        coords: "test",
        price: "1000"
      }
    },
  }).then((res) => {
    console.log(res);
    console.log('cookie', res.cookie)
  });
};

const handleSubmit3 = (e) => {
  e.preventDefault();
  api({
    method: 'get',
    url: '/testRoute',
  }).then((res) => {
    console.log(res);
  });
};

const getFavs = () =>{
  api({
    method: 'post',
    url: '/getFavs',
    data: {
      email
    }
  })
  .then(res => console.log(res.data.favsArr))
};

  return (
    <Container component="main" maxWidth="xs">
      <Box mt={3}>
        <Card classsName={classes.card}>
          <Box p={3}>
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <HouseIcon />
              </Avatar>
              {/* <div>
                <img src="https://i.imgur.com/q7xlJjy.png" />
              </div> */}
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <form className={classes.form} noValidate onSubmit={handleSubmit3}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="#" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </form>

              <Typography
                component="h3"
                variant="h5"
                className={classes.submit}
              >
                <Divider />
              </Typography>

              <Button
                startIcon={<GoogleIcon />}
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                {' '}
                Sign In With Google
              </Button>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick = {() => getFavs()}>
                  Get Favs
              </Button>
            </div>
            <Box mt={8}>
              <Copyright />
            </Box>
          </Box>
        </Card>
      </Box>
    </Container>
  );
}
