import axios from "axios";

const checkLoginState = () => {
  return axios.get("/auth/current_user");
};

const fetchPlaylists = () => {
  return axios.get("/spotify/playlists");
};

const logout = () => {
  return axios.get("/auth/logout");
};

const deletePlaylist = playlist_id => {
  return axios.get("/spotify/playlists/delete", {
    params: {
      id: playlist_id
    }
  });
};

const fetchTracks = playlist_id => {
  return axios.get("/spotify/playlists/tracks", {
    params: {
      id: playlist_id
    }
  });
};

const topTracks = () => {
  return axios.get("/spotify/stats/tracks");
};

const topArtists = () => {
  return axios.get("/spotify/stats/artists");
};


const reorder = (playlist_id, ranges) => {
  return axios.get("/spotify/playlists/reorder", {
    params: {
      id: playlist_id,
      ranges: ranges
    }
  });
}


const deleteTracks = (playlist_id, deleted) => {
  return axios.get("/spotify/playlists/delete/tracks", {
    params: {
      id: playlist_id,
      deleted: deleted
    }
  })
}


const createPlaylist = (id, meta) => {
  return axios.get("/spotify/playlists/create", {
    params: {
      id: id,
      meta: meta
    }
  })
}

const fetchSavedTracks = () => {
  return axios.get("/spotify/me/tracks", {
    params: {
      limit: 50
    }
  });
}


const addPlaylistTracks = (playlist_id, added) => {
  return axios.get("/spotify/playlists/add/tracks", {
    params: {
      id: playlist_id,
      uris: added
    }
  });
}

const getTopArtistsTracks = (ids) => {
  return axios.get("/spotify/artists/top", {
    params: {
      ids: ids
    }
  })
}


export {
  checkLoginState,
  fetchPlaylists,
  logout,
  deletePlaylist,
  fetchTracks,
  topArtists,
  topTracks,
  reorder,
  deleteTracks,
  createPlaylist,
  fetchSavedTracks,
  addPlaylistTracks,
  getTopArtistsTracks
};
