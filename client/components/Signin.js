import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
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
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import GoogleLoginButton from './GoogleLoginButton';

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
    // height="100%"
  },
  paper: {
    marginTop: theme.spacing(4),
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

//
export default function SignIn({isLoggedIn, setIsLoggedIn}) {
  const classes = useStyles();
  const history = useHistory();
  //state to store input field values
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  console.log('SIGN IN isLoggedIn: ', isLoggedIn);
  //const { isLoggedInBool, updateLoggedInStateBool } = props;
  console.log('SIGN RGR isLoggedIn: ', isLoggedIn);
  console.log('SIGN RGR setIsLoggedIn: ', typeof(setIsLoggedIn));
  // const [ isUserLoggedIn, setIsUserLoggedIn ] = useContext(UserContext);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
// setLightState(prevLightState => ({...prevLightState, ...newState}))
  // console.log('history ', history)
  //submit fxn to make http call to BE
  const handleSubmit = (e) => {
    e.preventDefault();
    //axios or api here? Which route should handle this...
    api({
      method: 'post',
      url: '/signin',
      data: {
        email,
        password,
      },
    }).then((res) => {
      console.log(res.data.isLoggedIn);
      setIsLoggedIn(res.data.isLoggedIn);
    });
  };

  if (isLoggedIn) return <Redirect to="/" />;

  // function handleUpdateLoginState(loggedInState) {
  //   console.log('isLoggedIn: ', isLoggedIn);
  //   console.log('RGR loggedInState variable: ', loggedInState);
  //   setIsLoggedIn(loggedInState);
  //   console.log('RGR State Updated to isLoggedIn: ', isLoggedIn);
    
  // }

  // const responseSuccessGoogle = (response) => {
  //   console.log('Response Success in signin: ', response);
  //   console.log('response token: ', response.tokenObj.id_token);
  //   //console.log('RGR props: ', props);
  //   api({
  //     method: 'post',
  //     url: '/googlelogin',
  //     data: {
  //       tokenId: response.tokenObj.id_token
  //     }
  //   }).then(response => {
  //     //console.log('isLogged in on response ', response.data.isLoggedIn);
  //     //updateLoggedInState
  //     handleUpdateLoginState(response.data.isLoggedIn);
  //   }).catch(erro => {
  //     console.log('IS ERROR ', erro);
  //   });
  // }
  // const responseErrorGoogle = (response) => {
  //   console.log('Response Error in signin: ', response);
  // }

  return (
    <Container component="main" maxWidth="xs" mt={5}>
      <Box mt={8} pt={0}>
        <Card classsName={classes.card} >
          <Box p={3} >
            <CssBaseline />
            <div className={classes.paper} >
              <Avatar className={classes.avatar} >
                <HouseIcon />
              </Avatar>
              {/* <div>
                <img src="https://i.imgur.com/q7xlJjy.png" />
              </div> */}
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <form className={classes.form} noValidate onSubmit={handleSubmit}>
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
                    <Link href="/signup" variant="body2">
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

              {/* <Button
                startIcon={<GoogleIcon />}
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                {' '}
                Sign In With Google
              </Button> */}
              {/* <GoogleLogin
                clientId= '801898613245-b0r1db1jmhf52qgu6k21bto13ts3jreg.apps.googleusercontent.com'
                buttonText='Login with google'
                onSuccess={responseSuccessGoogle}
                onFailure={responseErrorGoogle}
                cookiePolicy={'single_host_origin'}
              /> */}
              <GoogleLoginButton isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
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
