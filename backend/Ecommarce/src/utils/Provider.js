const passport = require('passport');
const Users = require('../model/users.model');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const googleProvider = async () => {

    try {
        await passport.use(new GoogleStrategy({
            clientID: '',
            clientSecret: '',
            callbackURL: "http://localhost:8000/api/v1/users/google/callback"
        },
            async function (accessToken, refreshToken, profile, cb) {
                console.log(profile);

                try {
                    let user = await Users.findOne({ googleId: profile.id })

                    if (!user) {
                        user = await Users.create({
                            name: profile.displayName,
                            email: profile.emails[0].value,
                            googleId: profile.id,
                            role: 'user'
                        })
                    }

                    return cb(null, user);
                } catch (error) {
                    return cb(error, null);
                }
            }
        ));

        passport.serializeUser(function (user, done) {
            done(null, user.id);
        });

        passport.deserializeUser(async function (id, done) {
            await Users.findById(id, function (err, user) {
                done(err, user);
            });
        });
    } catch (error) {
        console.log(error);
    }

}

module.exports = googleProvider