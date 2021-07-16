import React from 'react';
import { makeStyles, withStyles } from "@material-ui/core/styles";
import FavoriteIcon from "@material-ui/icons/Favorite";
import {
    Card,
    Grid,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia, // add property img from zillow api!
    Button,
    Typography,
    IconButton,
    Divider,
    Container
} from "@material-ui/core";
import './styles/propCardStyles.css'


// set useStyles
// const useStyles = makeStyles({
//     root: {
//         maxWidth: 345
//     }
// });

const styles = muiBaseTheme => ({
  card: {
    maxWidth: 300,
    margin: "auto",
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
    }
  },
  media: {
    paddingTop: "56.25%"
  },
  content: {
    textAlign: "left",
    padding: muiBaseTheme.spacing.unit * 3
  },
  divider: {
    margin: `${muiBaseTheme.spacing.unit * 3}px 0`
  },
  heading: {
    fontWeight: "bold"
  },
  subheading: {
    lineHeight: 1.8
  }
});


function ImgMediaCard({ classes }) {
    // set classes useStyles
    // const classes = useStyles();

    return (
        <div className={ImgMediaCard}>
        <Container maxwidth="lg">
            <Grid container spacing={4}>
                <Card className={classes.card}>
                    <CardMedia
                        className={classes.media}
                        image={"https://image.freepik.com/free-photo/river-foggy-mountains-landscape_1204-511.jpg"}
                    />
                    <CardContent className={classes.content}>
                        <Typography className={"MuiTypography--heading"} gutterBottom variant="h6">
                            Sample Card (Action)
                        </Typography>
                    </CardContent>
                    <Divider className={classes.divider} light />
                    <CardActions disableSpacing>
                        <IconButton aria-label='Add to Favorites'>
                            <FavoriteIcon/>
                        </IconButton>
                        <Button size="small" color="primary">
                            See Details
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
        </Container>
        </div>
    );
}

const WrappedImgMediaCard = withStyles(styles)(ImgMediaCard);
export default WrappedImgMediaCard;

