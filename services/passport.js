const passport = require("passport");
const SpotifyStrategy = require("passport-spotify").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");
const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new SpotifyStrategy(
    {
      clientID: keys.spotClient,
      clientSecret: keys.spotSecret,
      callbackURL: "/auth/spotify/callback"
    },
    function(accessToken, refreshToken, expires_in, profile, done) {
      User.findOne({ spotID: profile.id }).then(user => {
        if (user) {
          user.token = accessToken;
          user.profilePhoto = profile.photos[0];
          user.save().then(user => {
            done(null, user);
          })
        } else {
          new User({
            spotID: profile.username,
            token: accessToken,
            profileURL: profile.profileUrl,
            profilePhoto: profile.photos[0],
          })
            .save()
            .then(user => {
              done(null, user);
            });
        }
      });
    }
  )
);
