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
  const [gotFavs, setGotFavs] = useState(false);
  const [favDetailsOpen, setFavDetailsOpen] = useState(false);
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
  //get request to retrieve favorites

  const getFavs = async () => {
    await api({
      method: 'GET',
      url: '/getFavs',
    })
      .then((res) => {
        // console.log('RES IN GET FAVS', res);
        console.log('RES FAV ARR', res.data.favsArr);
        setTileData(res.data.favsArr);
        setGotFavs(true);
      })
      .catch((err) => {
        console.log('GET FAVS ERROR ', err.message);
      });
  };
  useEffect(() => {
    getFavs();
  }, []);
  // console.log('TILE DATA ', tileData);
  return (
    <div>
      <NavBar
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        setDarkState={setDarkState}
        darkState={darkState}
        handleThemeChange={handleThemeChange}
        />
      <Box display="flex" flexDirection="row" justifyContent="center">
        <Button variant="outlined" color="inherit" href="/">
          Map View
        </Button>
      </Box>
      <div className={classes.root}>
        <GridList cellHeight={300} className={classes.gridList}>
          <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
            <ListSubheader component="div" className={classes.header}>
              Favorites
            </ListSubheader>
          </GridListTile>
          {gotFavs &&
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
            ))}
        </GridList>
      </div>
      <FavModal
        prop={propDetail}
        open={favDetailsOpen}
        handleClose={handleClose}
      />
    </div>
  );
}

export default Favorites;
