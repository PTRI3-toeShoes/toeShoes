import React, { useState, useEffect } from 'react';
import HomePage from './HomePage';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import MainContainer from './components/MainContainer';
import Register from './components/Register';
import Favorites from './components/Favorites';
import NavBar from './components/NavBar';
import Test from './components/Test';
import { BrowserRouter as Router } from 'react-router-dom';

import MapView from './MapView';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { useHistory, Route, Switch } from 'react-router-dom';


const App = () => {
  // const history = useHistory()
  // const changeUrl = (item) => {
  //   history.push(item)
  // }
  const [darkState, setDarkState] = useState(false);
  const palletType = darkState ? 'dark' : 'light';
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mapTheme, setMapTheme] = useState("mapbox://styles/mapbox/streets-v11");

  function changeTheme(theme){
    setMapTheme(theme)
  }

  const handleThemeChange = () => {
    setDarkState(!darkState);
    darkState ? (changeTheme("mapbox://styles/mapbox/streets-v11"), document.body.style = 'background: white;') : (changeTheme("mapbox://styles/mapbox/dark-v8"), document.body.style = 'background: #424242;')
   
  };

  const darkTheme = createMuiTheme({
    palette: {
      type: palletType,
    },
  });

  return (
    <Router>
    <ThemeProvider theme={darkTheme}>
      <div className="router">
        {console.log('DARKSTATE IN APP', darkState)}

        {/* <NavBar handleThemeChange={handleThemeChange} darkState={darkState} /> */}

        <main>
          {/* <Switch> */}
{/* 
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/favs" component={Favorites} /> */}
            <Route path="/" exact component={HomePage}>
              <HomePage
                //Navabar props
                handleThemeChange={handleThemeChange}
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                setDarkState={setDarkState}
                darkState={darkState}

                
                //MainContainer props
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                mapTheme={mapTheme}



              >
                </HomePage>
            </Route>

    
            <Route exact path="/signin" component={SignIn} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}>
              {/* <SignIn isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} /> */}
            </Route>

            <Route exact path="/signup" component={SignUp}>
              <SignUp isLoggedIn={isLoggedIn} />
            </Route>

            

            <Route exact path="/register">
              <Register isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            </Route>
             <Route exact path="/favs">
              {/* <NavBar
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                setDarkState={setDarkState}
                darkState={darkState}
                handleThemeChange={handleThemeChange}
              /> */} 
            
              <Favorites
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                setDarkState={setDarkState}
                darkState={darkState}
                handleThemeChange={handleThemeChange}
                
              />
            </Route>
            <Route exact path="/test" component={Test} />
          {/* </Switch> */}
        </main>
      </div>
    </ThemeProvider>
    </Router>
 
  );
  
};

export default App;
