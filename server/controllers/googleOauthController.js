const config = require('../../config.json');
const googleOauthController = {};
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_KEY);

/*********************
 * Differentiate between a sign up and a sign in
************************** */

googleOauthController.googleLogin = async (req, res, next) => {
    const tokenId = req.body.tokenId;
    console.log('RGR tokenId: ', tokenId)
    // try{
    //     console.log('RGR inside try')
    //     client.verifyIdToken({
    //     idToken: tokenId, audience: '801898613245-b0r1db1jmhf52qgu6k21bto13ts3jreg.apps.googleusercontent.com'})
    //     .then(response => {
    //         const { email_verified, name, email } = response.payload;
    //         console.log('SLA veri, email, and name: ', email_verified, email, name);
    //         if(email_verified){
    //             //find in our database
    //             //if not, ERROR - user hasn't been created
    //             //query for the user
    //                 //if user found
    //                 // const token = jwt.sign()
    //             console.log('email_verified: ', email_verified);
    //         }
    //     });
    //     console.log('finished verifying');
    //     // console.log('request in googleOauthController: ', req);
    //     // console.log('response in googleOauthController: ', res);
    //     return res.status(200).send({ isLoggedIn: true });
    // } catch(error) {
    //     res.status(500).json({ message: 'Error in googleOauthController' });
    //     console.log('Error in googleOauth controller: ', error);
    // }
    try{
    const ticket = await client.verifyIdToken({
        idToken: tokenId, audience: process.env.GOOGLE_CLIENT_KEY});
    
    const payload = ticket.getPayload();
    const { email, sub, email_verified } = payload;
    console.log('process.env.SQL_STRING inside of oauth controller: ', process.env.SQL_STRING);
    console.log('process.env.GOOGLE_CLIENT_KEY inside of oauth controller: ', process.env.GOOGLE_CLIENT_KEY);
    console.log('RGR email, sub in gOauthController: ', email, sub);
    console.log('SLA whole payload ', payload);
    res.locals.oauthToken = true;
    res.locals.isLoggedIn = true;
    res.locals.email = email;
    console.log('res.locals inside of googleOauthController: ', res.locals);
    // return res.status(200).send({ isLoggedIn: true });
    return next();
    
    } catch(error) {
        res.status(500).json({ message: 'Error in googleOauthController' });
        console.log('Error in googleOauth controller: ', error);
    }
}

module.exports = googleOauthController;