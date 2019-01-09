const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(proxy("/auth/spotify", { target: "http://localhost:5000/" }));
  app.use(proxy("/auth/current_user", { target: "http://localhost:5000/" }));
  app.use(proxy("/auth/logout", { target: "http://localhost:5000/" }));
  app.use(proxy("/spotify/playlists/tracks", { target: "http://localhost:5000/" }));
  app.use(proxy("/spotify/playlists/tracks", { target: "http://localhost:5000/" }));
  app.use(proxy("/spotify/playlists/delete", { target: "http://localhost:5000/" }));
  app.use(proxy("/spotify/playlists", { target: "http://localhost:5000/" }));
  app.use(proxy("/spotify/stats/tracks", { target: "http://localhost:5000/" }));
  app.use(proxy("/spotify/stats/artists", { target: "http://localhost:5000/" }));
  app.use(proxy("/spotify/playlists/reorder", { target: "http://localhost:5000/" }));
  app.use(proxy("/spotify/playlists/create", { target: "http://localhost:5000/" }));
  app.use(proxy("/spotify/me/tracks", { target: "http://localhost:5000/" }));
  app.use(proxy("/spotify/playlists/delete/tracks", { target: "http://localhost:5000/" }));
  app.use(proxy("/spotify/playlists/add/tracks", { target: "http://localhost:5000/" }));
  app.use(proxy("/spotify/artists", { target: "http://localhost:5000/" }));
  app.use(proxy("/spotify/artists/top", { target: "http://localhost:5000/" }));
};

