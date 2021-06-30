import React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
<<<<<<< HEAD
import SearchBar from './SearchBar';
import MapView from '../MapView';
=======
import MapView from '../MapView'
>>>>>>> dev

const MainContainer = () => {
  return (
    <div>
      <Container>
        <Box>
<<<<<<< HEAD
          <Card>
            <SearchBar />
          </Card>
        </Box>
        <Box>
          <MapView />
        </Box>
=======
          {/* <SearchBar/> */}
        </Box>
        <Box><MapView/></Box>
        
>>>>>>> dev
      </Container>
      {/* <p>main display</p>
      <div>rental evaluator</div>
      <button
        onClick={async () => {
          let res = await fetch('/api/clickMe');
          res = await res.json();
          console.log(JSON.stringify(res));
          const node = document.getElementById('listings');
          node.innerHTML = JSON.stringify(res);
        }}
      >
        Click me
      </button>
      <div id="listings"></div> */}
      <p>main display</p>
      <div>rental evaluator</div>
      {/* <label htmlFor='location'>Search:</label> */}
      <input id="location" type="text" className="form-control" />
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
      </button>

      <pre id="listings"></pre>
    </div>
  );
};

export default MainContainer;
