import React, { useState } from 'react';
import NavBar from './components/NavBar';
import MainContainer from './components/MainContainer';

const HomePage = ({
  handleThemeChange,
  isLoggedIn,
  setIsLoggedIn,
  setDarkState,
  darkState,
  mapTheme

}) => {

  return (
    <div>
      <NavBar 

        handleThemeChange={handleThemeChange}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        setDarkState={setDarkState} 
        darkState={darkState}
   
      />
      <MainContainer 

            
      //MainContainer props
      isLoggedIn={isLoggedIn}
      setIsLoggedIn={setIsLoggedIn}
      mapTheme={mapTheme}
      
      
      
      
      />
    </div>







  )









}



export default HomePage;