import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import FavoriteIcon from '@material-ui/icons/Favorite';
import api from '../axios/axios';
import FavModal from './FavsModal';
import NavBar from './NavBar'; 
//Favorite array state set by get request in component fxn

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    minWidth: 500,
    width: 900,
    height: 'auto',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  header: {
    fontSize: '2em',
  },
}));

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */


const Favorites = ({isLoggedIn,setIsLoggedIn,setDarkState,
  darkState, handleThemeChange})  => {

  const classes = useStyles();
  const [tileData, setTileData] = useState([]);
  const [propDetail, setPropDetail] = useState({});
  const [favsArr, setFavsArr] = useState('')
  const [gotFavs, setGotFavs] = useState(false);
  const [favDetailsOpen, setFavDetailsOpen] = useState(false);
  const [currInd, setCurrInd] = useState(0);
  const [forwardsAvailable, setForwardsAvailable] = useState(true);
  const [backwardsAvailable, setBackwardsAvailable] = useState(false);

  const renderArr = [];

  //open/close handlers for add record modal
  const handleOpen = (e, idx) => {
    e.preventDefault();
    console.log('TILE DATA ', tileData[idx]);
    setPropDetail(tileData[idx]);
    console.log('PROPDETAIL ', propDetail);
    setFavDetailsOpen(true);
    console.log('ID', idx);
    console.log('detail modal OPEN');
  };

  const handleClose = () => {
    setFavDetailsOpen(false);
  };

  const noForwards = () => {
    setForwardsAvailable(false);
    console.log('noForwards activated')
  }
  const noBackwards = () => {
    setBackwardsAvailable(false);
  }

  const favForward= async () =>{
    // setForwardsAvailable(true);
    // setBackwardsAvailable(false);
    setCurrInd(currInd+1);
    console.log("Current spot in favsArr in favForward: ",currInd)
    const response = await api({
      method: 'GET',
      url: `/zillowFavQuery/${favsArr[currInd+1].zpid}`
    })
    setTileData(response.data.features[0].properties);
  }
  const favBackwards = async() =>{
     setForwardsAvailable(true);
    // setBackwardsAvailable(true);
    setCurrInd(currInd-1)
    console.log("Current spot in favsArr in favBackwards: ",currInd)
  //   const s= await function(){setCurrInd(currInd-1)};
    const response = await api({
    method: 'GET',
    url: `/zillowFavQuery/${favsArr[currInd-1].zpid}`
  })
  setTileData(response.data.features[0].properties);
  }


  //get request to retrieve favorites

  const getFavs = async () => {

    console.log('in getFavs in favorites')
    const response = await api({
      method: 'GET',
      url: '/getFavs',
      
    })
    console.log('Favs are here: ')

    if(!response) console.log('ERROR IN GETTING FAVS SENT TO FRONT END (favorites.js ln 93)');
    
    else return response.data;

  };
  useEffect(async() => {
    // const favsArr = [{'zpid':20153061},{'zpid':39777013},{'zpid':39774879}]
    const favsArr = await getFavs()
    //favsArr is populated with zillow zpids. On successful getting of that array can I query for the first fav here?
    if(favsArr){
      const response = await api({
        method: 'GET',
        url: `/zillowFavQuery/${favsArr[0].zpid}`
      })
      setFavsArr(favsArr)
      setTileData(response.data.features[0].properties);
      console.log('response in useEffect ', response.data.features[0].properties);
      
      renderArr.push(<FavModal props={response.data.features[0].properties}/>)
    }

  }, []);



   console.log('TILE DATA ', tileData);
   console.log('TILE DATA type', typeof tileData);
  return (
    <div>
      <NavBar

        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        setDarkState={setDarkState}
        darkState={darkState}
        handleThemeChange={handleThemeChange}
        />
      {/* <Box display="flex" flexDirection="row" justifyContent="center">
        <Button variant="outlined" color="inherit" href="/">
          Map View
        </Button>
      </Box> */}
      <div className={classes.root}>
        <GridList cellHeight={300} className={classes.gridList}>
          <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
            <ListSubheader component="div" className={classes.header}>
              Favorites
            </ListSubheader>
          </GridListTile>
          {/* {gotFavs &&
            tileData.map((tile, idx) => (
              <GridListTile key={tile.Image} idx={idx}>
                <img src={tile.Image} alt={tile.Address} />

                <GridListTileBar
                  title={tile.Address}
                  idx={idx}
                  subtitle={
                    <span>
                      Price: {tile.Price}
                      <br /> Investment Rating: {tile.Rating}
                    </span>
                  }
                  actionIcon={
                    <IconButton
                      idx={idx}
                      aria-label={`info about ${tile.address}`}
                      className={classes.icon}
                      onClick={(e) => {
                        console.log('ID IN ONCLICK ', idx);
                        handleOpen(e, idx);
                      }}
                    >
                      <InfoIcon />
                    </IconButton>
                  }
                />
              </GridListTile>
            ))} */}
        </GridList>
      </div>
      {renderArr}
      <FavModal
      noForwards={noForwards}
      noBackwards={noBackwards}
      forwardsAvailable={forwardsAvailable}
      setForwardsAvailable={setForwardsAvailable}
      backwardsAvailable={backwardsAvailable}
      backwardsAvailable={backwardsAvailable}
        favForward={favForward}
        favBackwards={favBackwards}
        prop={tileData}
        open={favDetailsOpen}
        handleClose={handleClose}
        currInd={currInd}
        favsArr={favsArr}
        setFavsArr={setFavsArr}
      />
    </div>
  );
}

export default Favorites;
