import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import FavoriteIcon from "@material-ui/icons/Favorite";
import {
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia, // add property img from zillow api
    Button,
    Typography,
    IconButton,
} from "@material-ui/core";

//set useStyles
// const useStyles = makeStyles({
//     root: {
//         maxWidth: 345
//     }
// })

export default function ImgMediaCard() {
    //set classes useStyles
    // const classes = useStyles();

    return (
        <Card>
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    Sample Card (Action)
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label='Add to Favorites'>
                    <FavoriteIcon/>
                </IconButton>
                <Button size="small" color="primary">
                    See Details
                </Button>
            </CardActions>
        </Card>
    );
}



