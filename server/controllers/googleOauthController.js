const config = require('../../config.json');
const googleOauthController = {};
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_KEY);
const db = require('../models/dbModel');
/*********************
 * Differentiate between a sign up and a sign in
************************** */

googleOauthController.googleLogin = async (req, res, next) => {
    const tokenId = req.body.tokenId;

    try{
    const ticket = await client.verifyIdToken({
        idToken: tokenId, audience: process.env.GOOGLE_CLIENT_KEY});
    
    const payload = ticket.getPayload();
    const { email, sub, email_verified } = payload;

    res.locals.oauthToken = true;
    res.locals.isLoggedIn = true;
    res.locals.email = email;

    //query db to see if email exists
    const queryString = `SELECT * FROM users WHERE email = $1`;
    db.query(queryString, [res.locals.email])
        .then((data) => {
            //yes user exists-> next
            if(data.rows.length < 0){
                const userEmail = data.rows[0].email;
                // res.locals.email = userEmail;
                return next();
            }else{
                //no-> create new user w/ email and dummy pw; next()
                const phonypw = '203falk2924';
                const queryString = `INSERT INTO users (username, email, password) VALUES ($1, $2, $3)`;
                db.query(queryString, [res.locals.email, res.locals.email, phonypw])
                return next();
            }
        })
        .catch(error => {
            console.log('Error in googleOauthController: ', error);
        });
    
    } catch(error) {
        res.status(500).json({ message: 'Error in googleOauthController' });
        console.log('Error in googleOauth controller: ', error);
    }
}

module.exports = googleOauthController;