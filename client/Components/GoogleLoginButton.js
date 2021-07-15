import React from 'react';
import api from '../axios/axios';
import GoogleLogin from 'react-google-login';
/*********************
 * Differentiate between a sign up and a sign in
************************** */
export default function GoogleLoginButton({isLoggedIn, setIsLoggedIn}){

    function handleUpdateLoginState(loggedInState) {
    console.log('isLoggedIn: ', isLoggedIn);
    console.log('RGR loggedInState variable: ', loggedInState);
    setIsLoggedIn(loggedInState);
    console.log('RGR State Updated to isLoggedIn: ', isLoggedIn);
    
  }

  const responseSuccessGoogle = (response) => {
    console.log('Response Success in signin: ', response);
    console.log('response token: ', response.tokenObj.id_token);
    //console.log('RGR props: ', props);
    api({
      method: 'post',
      url: '/googlelogin',
      data: {
        tokenId: response.tokenObj.id_token
      }
    }).then(response => {
      //console.log('isLogged in on response ', response.data.isLoggedIn);
      //updateLoggedInState
      handleUpdateLoginState(response.data.isLoggedIn);
    }).catch(erro => {
      console.log('IS ERROR ', erro);
    });
  }
  const responseErrorGoogle = (response) => {
    console.log('Response Error in signin: ', response);
  }

  return (
    <GoogleLogin
        clientId= '801898613245-b0r1db1jmhf52qgu6k21bto13ts3jreg.apps.googleusercontent.com'
        buttonText='Login with google'
        onSuccess={responseSuccessGoogle}
        onFailure={responseErrorGoogle}
        cookiePolicy={'single_host_origin'}
    />
  )

}
