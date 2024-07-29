// const passport = require('passport');
// const Users = require('../model/users.model');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;

// const googleProvider = async () => {

//     try {
//         await passport.use(new GoogleStrategy({
//             clientID: '',
//             clientSecret: '',
//             callbackURL: "http://localhost:8000/api/v1/users/google/callback"
//         },
//             async function (accessToken, refreshToken, profile, cb) {
//                 console.log(profile);

//                 try {
//                     let user = await Users.findOne({ googleId: profile.id })

//                     if (!user) {
//                         user = await Users.create({
//                             name: profile.displayName,
//                             email: profile.emails[0].value,
//                             googleId: profile.id,
//                             role: 'user'
//                         })
//                     }

//                     return cb(null, user);
//                 } catch (error) {
//                     return cb(error, null);
//                 }
//             }
//         ));

//         passport.serializeUser(function (user, done) {
//             done(null, user.id);
//         });

//         passport.deserializeUser(async function (id, done) {
//             await Users.findById(id, function (err, user) {
//                 done(err, user);
//             });
//         });
//     } catch (error) {
//         console.log(error);
//     }

// }

// module.exports = googleProvider

const passport = require('passport');
const Users = require('../model/users.model');
const FacebookStrategy = require('passport-facebook').Strategy;

const FacebookProvider = async () => {
    console.log("Initializing FacebookProvider...");
    try {
        passport.use(new FacebookStrategy({
            // clientID: "784353853881283",
            // clientSecret: "66bf9d5b9ddc2663a9195fa6f532430b",
            callbackURL: "http://localhost:8000/api/v1/users/facebook/callback",
            profileFields: ['id', 'displayName', 'emails'] // Specify which fields to return
        },
            async function (accessToken, refreshToken, profile, cb) {
                try {
                    // Log the profile object to debug
                    console.log("Facebook Profile:", profile);

                    // Find user by Facebook ID
                    let user = await Users.findOne({ facebookId: profile.id });

                    // Check if user exists
                    if (!user) {
                        // Check if profile.emails is defined and not empty
                        const email = (profile.emails && profile.emails.length > 0) ? profile.emails[0].value : null;

                        if (!email) {
                            // Handle case where email is not available
                            return cb(new Error('No email found in Facebook profile'), null);
                        }

                        // Create new user
                        user = await Users.create({
                            name: profile.displayName,
                            email: email,
                            facebookId: profile.id,
                            role: 'user'
                        });
                    }

                    // Log the user data
                    console.log("User data:", user);

                    // Return user object
                    return cb(null, user);
                } catch (error) {
                    console.error("Error in Passport callback:", error);
                    return cb(error, null);
                }
            }));

        passport.serializeUser(function (user, done) {
            // console.log("seriallize");
            done(null, user.id);
        });

        passport.deserializeUser(async function (id, done) {
            try {
                const user = await Users.findById(id).exec(); // Use exec() to get a promise
                // console.log("deserializeUserok");
                done(null, user);
            } catch (err) {
                console.error("Error deserializing user:", err);
                done(err, null);
            }
        });
        
    } catch (error) {
        console.error("Error initializing FacebookProvider:", error.message);
    }
};

module.exports = FacebookProvider;
