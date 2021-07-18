import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { 
    Grid,
    CssBaseline,
    Container
 } from "@material-ui/core";
import api from '../axios/axios';

import ImgMediaCard from "./ImgMediaCard";
import { Button } from "bootstrap";

const useStyles = makeStyles((theme) => ({
    root: {
        "& > *": {
            margin: theme.spacing(1)
        }
    }
}));



export default function SimilarPropertiesContainer() {

    // const classes = useStyles();
    // some meaningful logic
    const [apiCallStatus, setApiCallStatus] = useState(null);
    const [needSimilarPropertiesStatus, setNeedSimilarPropertiesStatus] = useState(false);
    const [similarProperties, setSimilarProperties] = useState({});

    const fetchSimilarProperties = () => {
            setApiCallStatus('loading similarProperties api call');
            api({
                method: 'post',
                url: '/similar', 
                data: {
                    zpid: Number(2080998890)
                },
            }).then(response => {
                // const results = response.json();
                // console.log('results in requestSimilarProperties: ', results);
                console.log('response in requestSimilarProperties: ', response);

                // update SimilarProperties state
                setSimilarProperties(response.data.similarProperties);
                // update API call status
                setApiCallStatus('done');
                return results;
            }).catch(error => {
                console.log('error.response: ', error.response)
                console.error(`fetchSimilarProperties call failed ${error.response}`);
            })
    }

    // useEffect(() => {
    //     fetchSimilarProperties();
    // });

    console.log('similarProperties after useEffect?: ', similarProperties);

    const handleFindSimilarProperties = () => {
        return fetchSimilarProperties();
    }

    const listOfSimilarProperties = () => {
        <Container  maxwidth="lg">
            <Grid container spacing={4}>
                {similarProperties.map((value) => {
                    const propertyLabelId = `similarProperties-item-${value}`;
                    return (
                        <ImgMediaCard key={propertyLabelId}/> 
                    );
                })}           
            </Grid>
        </Container>
    }
    //ultimate refactor - render mapping the properties onto a div
    return (
        <div>
            <CssBaseline />
            <div>
                <Button variant="contained" color="primary" onClick={handleFindSimilarProperties}>
                    Find Similar Properties
                </Button>
            </div>
        </div>
    )
}