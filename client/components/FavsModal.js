import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Paper,Dialog,Typography, Grid, Card, Divider, Box, IconButton,Button } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const FavModal = ({ open, handleClose, prop, favForward, favBackwards }) => {
  {console.log('PROP', prop)}
 
  const useStyles = makeStyles((theme) => ({
    Arrows:{
      marginTop:440
    },
    container: {
      maxWidth: 800,
      marginTop: 40,
      // height: '100vh',
      // marginLeft:20,

      position :'relative',
      display:'flex',
      justifyContent:'center',
      alignItems: 'center'
  
    },
    card: {
      margin: 20,
      padding: 20,
    },
    imgContainer: {
      justify: 'center',
    },
    image: {
      maxWidth: 400,
      height: 'auto',
    },


    detailField: {
      padding: theme.spacing(3),
    },
  }));

  const classes = useStyles();

  const deleteFromDB = (e) =>{
    api({
      method: 'delete',
      url: '/deleteFav',
      data: {
        ZPID: e,
      },
    })
      .then((res) => {
        console.log('DELETE FAV RESPONSE ', res.data);
      })
      .catch((err) => console.log('DELETE FAV ERROR', err));
  }


  return (
    <Grid container justify='center'>
    <Grid item fontSize="large" component={ArrowBackIosIcon} lg={1} style={{textAlign:"center"}} className={classes.Arrows}/>
  
    <Grid item
    style={{textAlign:"center"}}
    component={Paper}
    lg={2}
    open={open}
    onClose={handleClose}
    className={classes.container}
    prop={prop}
    elevation={12}
    
  >
   
    <Box className={classes.card}>
      <Grid>
        <Grid container justify="flex-end">
          {/* <IconButton onClick={handleAddFavs}>{favIcon}</IconButton> */}
          <IconButton onClick={handleClose}>
            <Button variant="outlined" onClick={()=>{deleteFromDB(prop.ZPID)}}>Delete</Button>
          </IconButton>
        </Grid>
        <Grid container xs={12} justify="center">
          <Box className={classes.imgContainer}>
            <img src={prop.Image} className={classes.image} />
          </Box>
        </Grid>
        <Grid container>
          <Grid xs={12}>
            <Typography variant="h4" component="h4">
              Property Details:
            </Typography>
          </Grid>
          <Divider light/>
          <Grid xs={12} className={classes.detail}>
            <Typography>Address: {prop.Address}</Typography>
          </Grid>
          {'Price' in prop && <Grid xs={12}>
            <Typography>Price: {prop.Price}</Typography>
          </Grid>}
          {'Monthly rent' in prop && <Grid xs={12}>
            <Typography>Monthly Rent: {prop['Monthly rent']}</Typography>
          </Grid>}
          <Grid xs={12}>
            <Typography>Type: {prop.Type}</Typography>
          </Grid>
          <Grid xs={12}>
            <Typography>Size: {prop.Size}</Typography>
          </Grid>
          <Grid xs={12}>
            <Typography>Bed Rooms: {prop['# bedrooms']}</Typography>
          </Grid>
          <Grid xs={12}>
            <Typography>Bath Rooms: {prop['# bathrooms']}</Typography>
          </Grid>
          {'Est. monthly mortgage' in prop && <Grid xs={12}>
            <Typography>
              Est. Monthly Mortgage: {prop['Est. monthly mortgage']}
            </Typography>
          </Grid>}
          {'Rating' in prop && <>
            <Grid xs={12}>
              <Typography>
                Est. Monthly Rent: {prop['Est. monthly rent']}
              </Typography>
            </Grid>
            <Grid xs={12}>
              <Typography>
                Price to Rent Ratio: {prop['Price-to-rent ratio']}
              </Typography>
            </Grid>
            <Grid xs={12}>
              <Typography>Rating: {prop.Rating}</Typography>
            </Grid>
          </>}
        </Grid>
      </Grid>
    </Box>
  </Grid>
  <Grid item fontSize="large" component={ArrowForwardIosIcon} onClick={favForward} lg={1} style={{textAlign:"center"}} className={classes.Arrows}/>
  </Grid>
   
  )

};
export default FavModal;
