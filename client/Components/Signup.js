import React, { useState } from 'react';
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
import { useHistory } from 'react-router-dom'
import LockIcon from '@material-ui/icons/Lock';


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

export default function SignUp({isLoggedIn, setIsLoggedIn}) {
  const classes = useStyles();
  const history = useHistory();
  //state to store input field values
  const [emails, setEmails] = useState('');
  const [passwords, setPasswords] = useState('');
  const [confirm, setConfirm] = useState('');

  console.log('history ', history)
  //submit fxn to make http call to BE
  const handleSubmit = (e) => {
  
    
    e.preventDefault();
    if(passwords === confirm){
      api({
        method: 'post',
        url: '/signup',
        data: {
          emails,
          passwords,
        },
      }).then((res) => {
        console.log(res.data.isLoggedIn);
        setIsLoggedIn(res.data.isLoggedIn)
        alert('Signed in!')
        
      });
    }
    if(passwords !== confirm) alert(`Passwords don't match!`)
  };

  if(isLoggedIn) return <Redirect to="/"/>;

  return (
    <Container component="main" maxWidth="xs" mt={5}>
      <Box mt={8} pt={0}>
        <Card classsName={classes.card} >
          <Box p={3} >
            <CssBaseline />
            <div className={classes.paper} >
              <Avatar className={classes.avatar} >
                <LockIcon />
              </Avatar>
              {/* <div>
                <img src="https://i.imgur.com/q7xlJjy.png" />
              </div> */}
              <Typography component="h1" variant="h5">
                Sign Up
              </Typography>
              <form className={classes.form} noValidate onSubmit={handleSubmit}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="emails"
                  label="Email Address"
                  name="emails"
                  autoComplete="emails"
                  value={emails}
                  onChange={(e) => {
                    setEmails(e.target.value);
                  }}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="passwords"
                  label="Password"
                  type="password"
                  id="passwords"
                  autoComplete="current-password"
                  value={passwords}
                  onChange={(e) => {
                    setPasswords(e.target.value);
                  }}
                />

                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="confirm_password"
                  label="Confirm Password"
                  type="password"
                  id="confirm password"
                  autoComplete="current-password"
                  value={confirm}
                  onChange={(e) => {
                    setConfirm(e.target.value);
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
                  Sign Up
                </Button>
                <Grid container>
                  {/* <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid> */}
                  {/* <Grid item>
                    <Link href="#" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid> */}
                </Grid>
              </form>

              <Button
                startIcon={<GoogleIcon />}
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                {' '}
                Sign Up With Google
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
