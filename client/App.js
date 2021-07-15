import React, { useState, useEffect, useContext } from 'react';
import SignIn from './components/Signin';
import MainContainer from './components/MainContainer';
import Register from './components/Register';
import Favorites from './components/Favorites';
import NavBar from './components/NavBar';
import Test from './components/Test';

import { Switch, Route, Redirect } from 'react-router-dom';
import MapView from './MapView';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';

// import { UserContext } from './contexts/UserContext';


const App = () => {
  const [darkState, setDarkState] = useState(false);
  const palletType = darkState ? 'dark' : 'light';
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // const {isLoggedIn, setIsLoggedIn } = useContext(UserContext);

  const handleThemeChange = () => {
    setDarkState(!darkState);
  };

  const darkTheme = createMuiTheme({
    palette: {
      type: palletType,
    },
  });

 // setLightState(prevLightState => ({...prevLightState, ...newStat
  const updateLoggedInState = (logBool) => {
    console.log('In updateLoggedInState');
    console.log('logBool: ', logBool);
    console.log('isLoggedIn: ', isLoggedIn);
    console.log('setIsLoggedIn: ', typeof(setIsLoggedIn));
    setIsLoggedIn(logBool);
    console.log('typeof setIsLoggedIn: ', typeof(setIstLoggedIn));
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="router">
        {console.log('DARKSTATE IN APP', darkState)}
        {console.log('isLoggedIn inside of app.js: ', isLoggedIn)}
        {console.log('typeof updateLoggedInState inside of app.js: ', typeof(updateLoggedInState))}
        {/* <NavBar handleThemeChange={handleThemeChange} darkState={darkState} /> */}

        <main>
          <Switch>
            {/* </UserContext.Provider> */}
            <Route exact path="/"> 
              <NavBar
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                setDarkState={setDarkState}
                darkState={darkState}
                handleThemeChange={handleThemeChange}
              />
              <MainContainer
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
              />
            </Route>
            <Route exact path="/signin">
              <SignIn  
               isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn} />
            </Route>

            <Route exact path="/register">
              <Register isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            </Route>
            <Route exact path="/favs">
              <NavBar
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                setDarkState={setDarkState}
                darkState={darkState}
                handleThemeChange={handleThemeChange}
              />
              <Favorites
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
              />
            </Route>
            <Route exact path="/test" component={Test} />
            {/* </UserContext.Provider> */}
          </Switch>
        </main>
      </div>
    </ThemeProvider>
  );
};

export default App;
