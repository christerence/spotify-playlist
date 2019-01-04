import { createAction, handleActions } from "redux-actions";

export const actions = {
  fetchPlaylists: "SPOTIFY/PLAYLISTS",
  setPlaylists: "SPOTIFY/SET_PLAYLISTS",
  fetchPlaylistsTracks: "SPOTIFY/FETCH_TRACKS",
  setPlaylistsTracks: "SPOTIFY/SET_PLAYLIST_TRACKS",
  fetchStats: "SPOTIFY/FETCH_STATS",
  setStats: "SPOTIFY/SET_STATS",
  emptyPlayListTracks: "SPOTIFY/EMPTY_TRACKS",
  reorder: "SPOTIFY/PLAYLIST/REORDER",
  deleteTracks: "SPOTIFY/DELETE_TRACKS",
  deletePlaylist: "SPOTIFY/DELETE_PLAYLIST",
  createPlaylist: "SPOTIFY/CREATE_PLAYLIST",
  addPlaylist: "SPOTIFY/ADD_PLAYLIST",
  fetchSavedTracks: "SPOTIFY/FETCH_SAVED_TRACKS",
  setSavedTracks: "SPOTIFY/SET_SAVED_TRACKS",
  addPlaylistTracks: "SPOTIFY/ADD_PLAYLIST_TRACKS",
  generate: "SPOTIFY/GENERATE_PLAYLIST"
};

export const fetchPlaylists = createAction(actions.fetchPlaylists);
export const setPlaylists = createAction(actions.setPlaylists);
export const fetchPlaylistsTracks = createAction(actions.fetchPlaylistsTracks);
export const setPlaylistsTracks = createAction(actions.setPlaylistsTracks);
export const emptyPlayListTracks = createAction(actions.emptyPlayListTracks);
export const fetchStats = createAction(actions.fetchStats);
export const setStats = createAction(actions.setStats);
export const reorder = createAction(actions.reorder);
export const deleteTracks = createAction(actions.deleteTracks);
export const deletePlaylist = createAction(actions.deletePlaylist);
export const createPlaylist = createAction(actions.createPlaylist);
export const addPlaylist = createAction(actions.addPlaylist);
export const fetchSavedTracks = createAction(actions.fetchSavedTracks);
export const addPlaylistTracks = createAction(actions.addPlaylistTracks);
export const generate = createAction(actions.generate);

const INITIAL_STATE = {
  playlists: [],
  savedTracks: [],
  currentTracks: [],
  stats: {
    artists: [],
    tracks: []
  }
};

export default handleActions(
  {
    [actions.setPlaylists]: (state, action) => ({
      ...state,
      playlists: action.payload
    }),
    [actions.setPlaylistsTracks]: (state, action) => ({
      ...state,
      currentTracks: action.payload
    }),
    [actions.setStats]: (state, action) => ({
      ...state,
      stats: action.payload
    }),
    [actions.emptyPlayListTracks]: (state, action) => ({
      ...state,
      currentTracks: []
    }),
    [actions.addPlaylist]: (state, action) => {
      const { playlists } = state;
      playlists.push(action.payload)
      return {
        ...state,
        playlists: playlists
      };
    },
    [actions.setSavedTracks]: (state, action) => ({
      ...state, 
      savedTracks: action.payload
    })
  },
  INITIAL_STATE
);
