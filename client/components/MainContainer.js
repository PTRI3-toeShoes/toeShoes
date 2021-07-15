import React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import SearchBar from './SearchBar';
import MapView from '../MapView';
import RanksContainer from './RanksContainer';

const MainContainer = ({mapTheme, favoriteCount, setFavoriteCount}) => {
  return (
    <Container component="main">
      <Container>
        <Box>
          <MapView mapTheme={mapTheme} favoriteCount = {favoriteCount} setFavoriteCount = {setFavoriteCount}/>
        </Box>
      </Container>

      {/* <label htmlFor='location'>Search:</label> */}
      {/* <input id="location" type="text" className="form-control" />
      <button
        onClick={async () => {
          const params = {
            location: document.getElementById('location').value,
          };
          const qs = new URLSearchParams(params).toString();
          console.log(`/api/properties?${qs}`);
          const res = await fetch(`/api/properties?${qs}`).then((res) =>
            res.json()
          );
          console.log(JSON.stringify(res, null, 2));
          const node = document.getElementById('listings');
          node.innerHTML = JSON.stringify(res, null, 2);
        }}
      >
        Click me
      </button> */}
      {/* <br></br>
      <input id="location1" type="text" className="form-control" />
      <button
        onClick={async () => {
          const params = {
            location: document.getElementById('location1').value,
          };
          const qs = new URLSearchParams(params).toString();
          console.log(`/api/properties/target?${qs}`);
          const res = await fetch(`/api/properties/target?${qs}`).then((res) =>
            res.json()
          );
          console.log(JSON.stringify(res, null, 2));
          const node = document.getElementById('listings');
          node.innerHTML = JSON.stringify(res, null, 2);
        }}
      >
        Search target
      </button>
      <pre id="listings"></pre> */}
      {/* <RanksContainer/> */}
    </Container>
  );
};

export default MainContainer;
