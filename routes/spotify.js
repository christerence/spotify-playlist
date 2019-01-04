const axios = require("axios");

const spotify_url = "https://api.spotify.com/v1/";

module.exports = app => {
  app.get("/spotify/playlists", async (req, res) => {
    try {
      const result = await axios({
        method: "get",
        url: `${spotify_url}me/playlists`,
        headers: {
          Authorization: 'Bearer ' + req.user.token
        }
      });
      res.send({ playlists: result.data, success: true });
    } catch (err) {
      res.send({ error: err.message, success: false});
    }
  });

  app.get("/spotify/playlists/delete", async (req, res) => {
    try {
      const result = await axios({
        method: "delete",
        url: `${spotify_url}playlists/${req.query.id}/followers`,
        headers: {
          Authorization: 'Bearer ' + req.user.token
        }
      });
      res.send({ success: true });
    } catch (err) {
      res.send({  success: false });
    }
  });

  app.get("/spotify/playlists/tracks", async (req, res) => {
    try {
      const result = await axios({
        method: "get",
        url: `${spotify_url}playlists/${req.query.id}/tracks`,
        headers: {
          Authorization: 'Bearer ' + req.user.token
        }
      });
      var total = result.data.total;
      var items = result.data.items;
      var count = 100;
      while(count < total) {
        let interim = await axios({
          method: "get",
          url: `${spotify_url}playlists/${req.query.id}/tracks`,
          params: {
            offset: count,
          },
          headers: {
            Authorization: 'Bearer ' + req.user.token
          }
        });
        items = [
          ...items, 
          ...interim.data.items
        ]
        count += 100;
      }
      res.send({ data: items, total: result.data.total, success: false });
    } catch (err) {
      res.send({  err: err.message, success: false });
    }
  });

  app.get("/spotify/stats/tracks", async (req, res) => {
    try {
      const result = await axios({
        method: "get",
        url: `${spotify_url}me/top/tracks`,
        headers: {
          Authorization: 'Bearer ' + req.user.token
        }
      });
      res.send({ data: result.data.items, total: result.data.total, success: true });
    } catch (err) {
      res.send({  err: err.message, success: false });
    }
  });


  app.get("/spotify/stats/artists", async (req, res) => {
    try {
      const result = await axios({
        method: "get",
        url: `${spotify_url}me/top/artists`,
        headers: {
          Authorization: 'Bearer ' + req.user.token
        }
      });
      res.send({ data: result.data.items, total: result.data.total, success: true });
    } catch (err) {
      res.send({  err: err.message, success: false });
    }
  });

  app.get("/spotify/playlists/reorder", async (req, res) => {
    try {
      const result = await axios({
        method: "put",
        url: `${spotify_url}playlists/${req.query.id}/tracks`,
        data: req.query.ranges,
        headers: {
          Authorization: 'Bearer ' + req.user.token
        }
      });
      res.send({ success: true });
    } catch (err) {
      res.send({  err: err.message });
    }
  });

  app.get("/spotify/playlists/delete/tracks", async (req, res) => {
    try {
      const result = await axios({
        method: "delete",
        url: `${spotify_url}playlists/${req.query.id}/tracks`,
        data: req.query.deleted,
        headers: {
          Authorization: 'Bearer ' + req.user.token
        }
      });
      res.send({ success: true });
    } catch (err) {
      res.send({  success: false });
    }
  });

  app.get("/spotify/playlists/create", async (req, res) => {
    try {
      const result = await axios({
        method: "post",
        url: `${spotify_url}users/${req.query.id}/playlists`,
        data: req.query.meta,
        headers: {
          Authorization: 'Bearer ' + req.user.token
        }
      });
      res.send({ result: result.data, success: true });
    } catch (err) {
      res.send({ err: err.message, success: false });
    }
  });

  app.get("/spotify/me/tracks", async (req, res) => {
    try {
      const result = await axios({
        method: "get",
        url: `${spotify_url}me/tracks`,
        params: {
          limit: req.query.limit
        },
        headers: {
          Authorization: 'Bearer ' + req.user.token
        }
      });

      var total = result.data.total;
      var items = result.data.items;
      var count = 50;
      while(count < total) {
        let interim = await axios({
          method: "get",
          url: `${spotify_url}me/tracks`,
          params: {
            limit: req.query.limit,
            offset: count,
          },
          headers: {
            Authorization: 'Bearer ' + req.user.token
          }
        });
        items = [
          ...items, 
          ...interim.data.items
        ]
        count += 50;
      }
      res.send({ result: items, success: true });
    } catch (err) {
      res.send({ err: err.message, success: false });
    }
  });

  app.get("/spotify/playlists/add/tracks", async (req, res) => {
    try {
      const result = await axios({
        method: "post",
        url: `${spotify_url}playlists/${req.query.id}/tracks`,
        data: req.query.uris,
        headers: {
          Authorization: 'Bearer ' + req.user.token
        }
      });
      res.send({ result: result.data, success: true });
    } catch (err) {
      res.send({ err: err.message, success: false });
    }
  });


  app.get("/spotify/artists", async (req, res) => {
    try {
      const result = await axios({
        method: "get",
        url: `${spotify_url}artists`,
        params: {
          ids: req.query.ids.join()
        },
        headers: {
          Authorization: 'Bearer ' + req.user.token
        }
      });
      res.send({ result: result.data, success: true });
    } catch (err) {
      res.send({ err: err.message, success: false });
    }
  })

};