const passport = require("passport");
const axios = require("axios");

const spotify_url = "https://api.spotify.com/v1/";

module.exports = app => {
  app.get(
    "/auth/spotify",
    passport.authenticate("spotify", {
      scope: ["user-top-read", "playlist-read-private", "playlist-read-collaborative", "playlist-modify-public", "playlist-modify-private", "user-library-read"]
    })
  );
  app.get("/auth/spotify/callback", passport.authenticate("spotify"), function(
    req,
    res
  ) {
    res.redirect("/");
  });
  app.get("/auth/logout", (req, res) => {
    req.logout();
    res.send({ success: true })
  });
  app.get("/auth/current_user", (req, res) => {
    res.send(req.user);
  });
};
