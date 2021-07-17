import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Paper,Dialog,Typography, Grid, Card, Divider, Box, IconButton,Button } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const FavModal = ({ open, handleClose, prop, favForward, favBackwards, currInd, favsArr, setFavsArr, forwardsAvailable, setForwardsAvailable, backwardsAvailable, setBackwardsAvailable,noForwards, noBackwards}) => {
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
      // alignItems:center
      margin: 'auto',
      padding: 20,
    },
    imgContainer: {
      justify: 'center',
    },
    image: {
      width: 600,
      height: 'auto',
    },


    detailField: {
      padding: theme.spacing(3),
    },
  }));

  const classes = useStyles();

  const deleteFromDB = (e) =>{
    console.log('To be deleted: ', e)
    let arr =[]
    
    for(let i =0; i < favsArr.length; i++){
      
      if(favsArr[i].zpid !== e){arr.push(favsArr[i])
      
      
    }}
   
    setFavsArr(arr);
    //if(currInd > 0) favForward();
     if(forwardsAvailable){
       favForward() 
       return;
      }else {
        favBackwards();
        return;
      }
    // console.log('this is e', e)
    // const tempArr = favsArr.slice()  
    // const index = tempArr.indexOf(e);
    // if (index > -1) {
    //   tempArr.splice(index, 1);
    // }
    // setFavsArr(tempArr);
    console.log("favarr", favsArr)

    console.log(arr)
    
    api({
      method: 'delete',
      url: '/deleteFav',
      data: {
        zpid: e,
      },
    })
      .then((res) => {
        console.log('DELETE FAV RESPONSE ', res.data);
      })
      .catch((err) => console.log('DELETE FAV ERROR', err));
  }

  
  return (
    <div>
    <Grid container justify='center'>
    {currInd <=0 &&
    <Grid item fontSize="large" style={{color:"white"}} onClick={noBackwards()} component={ArrowBackIosIcon} lg={1} className={classes.Arrows}/>}
    {currInd >0 &&
    <Grid item fontSize="large" onClick={favBackwards} component={ArrowBackIosIcon} lg={1} className={classes.Arrows}/>}
  
    <Grid item
    
    component={Paper}
    lg={4}
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
  {currInd < favsArr.length-1 &&
  <Grid item fontSize="large" component={ArrowForwardIosIcon} onClick={favForward} lg={1} className={classes.Arrows} />}
  {currInd === favsArr.length-1 &&
  <Grid item fontSize="large" style={{color:"white"}} onClick={noForwards()} component={ArrowForwardIosIcon} lg={1} className={classes.Arrows}/>}
  
  </Grid>
  </div>
   
  )

};
export default FavModal;
