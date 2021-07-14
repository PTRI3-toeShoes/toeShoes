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
  const [favoriteCount, setFavoriteCount] = useState(1);

  return (
    <div>
      <NavBar 

        favoriteCount = {favoriteCount}
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
      setFavoriteCount = {setFavoriteCount}
      favoriteCount = {favoriteCount}
      
      
      
      
      />
    </div>







  )









}



export default HomePage;