import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { 
    Grid,
    CssBaseline,
    Container
 } from "@material-ui/core";

import ImgMediaCard from "./ImgMediaCard";

// const useStyles = makeStyles((theme) => ({
//     root: {
//         "& > *": {
//             margin: theme.spacing(1)
//         }
//     }
// }));

// const classes = useStyles();


export default function RanksContainer() {
    //logic


    //ultimate refactor - render mapping the properties onto a div
    return (
        <div>
            <CssBaseline />
            <div>
                <Container  maxwidth="md">
                    <Grid container spacing={4}>
                        <ImgMediaCard/>
                        <ImgMediaCard/>
                        <ImgMediaCard/>
                    </Grid>
                </Container>
            </div>
        </div>
    )
}