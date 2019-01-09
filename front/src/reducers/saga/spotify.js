import { call, put, takeEvery, select } from "redux-saga/effects";
import { actions } from "../spotify";
import {
  fetchPlaylists,
  fetchTracks,
  topArtists,
  topTracks,
  reorder,
  deleteTracks,
  deletePlaylist,
  createPlaylist,
  fetchSavedTracks,
  addPlaylistTracks,
  getTopArtistsTracks
} from "../../api/spotify";
import { filter, find, remove, shuffle, take } from "lodash";
import { getUser, getSavedTracks, getStats } from "./selector";

export const fetchPlaylistsAction = function*(action) {
  const result = yield call(fetchPlaylists);
  if (result.data.success) {
    yield put({
      type: actions.setPlaylists,
      payload: result.data.playlists.items
    });
  }
};

export const fetchPlaylistTracksAction = function*(action) {
  const result = yield call(fetchTracks, action.payload);
  yield put({ type: actions.setPlaylistsTracks, payload: result.data.data });
};

export const fetchStatsAction = function*(action) {
  const tracks = yield call(topTracks);
  const artists = yield call(topArtists);
  if (tracks.data.success && artists.data.success) {
    const result = {
      tracks: tracks.data.data,
      artists: artists.data.data
    };
    yield put({ type: actions.setStats, payload: result });
  }
};

export const reorderAction = function*(action) {
  const { playlist_id, newList, oldIdx, newIdx } = action.payload;
  const ranges = {
    range_start: oldIdx,
    range_length: 1,
    insert_before: newIdx + (newIdx < oldIdx ? 0 : 1)
  };
  yield call(reorder, playlist_id, ranges);
  yield put({ type: actions.setPlaylistsTracks, payload: newList });
};

export const deleteTracksAction = function*(action) {
  const { playlist_id, deleted, current } = action.payload;

  const parsed = deleted.map(val => {
    return { uri: val.track.uri, positions: [val.key] };
  });

  const newList = filter(current, (val, key) => {
    return (
      find(deleted, o => o.track.id === val.track.id && o.key === key) ===
      undefined
    );
  });

  yield call(deleteTracks, playlist_id, { tracks: parsed });
  yield put({ type: actions.setPlaylistsTracks, payload: newList });
};

export const deletePlaylistAction = function*(action) {
  const { playlist_id, current } = action.payload;
  yield call(deletePlaylist, playlist_id);

  remove(current, o => {
    return o.id === playlist_id;
  });

  yield put({ type: actions.setPlaylists, payload: current });
};

export const createPlaylistAction = function*(action) {
  const { id, meta } = action.payload;
  const result = yield call(createPlaylist, id, meta);
  if (result.data.success) {
    yield put({ type: actions.addPlaylist, payload: result.data.result });
  }
};

export const fetchSavedTracksAction = function*(action) {
  const result = yield call(fetchSavedTracks);
  if (result.data.success) {
    yield put({
      type: actions.setSavedTracks,
      payload: result.data.result
    });
  }
};

export const addPlaylistTracksAction = function*(action) {
  const { playlist_id, added, current } = action.payload;

  const uris = added.map(val => {
    return val.track.uri;
  });

  added.forEach(val => {
    current.push(val);
  });

  yield call(addPlaylistTracks, playlist_id, {
    uris: uris
  });
  yield put({ type: actions.setPlaylistsTracks, payload: current });
};

export const generateAction = function*(action) {
  const user = yield select(getUser);
  const id = user.data.spotID;
  let uris;

  switch (action.payload) {
    case "Saved Songs":
      let saved = yield select(getSavedTracks);
      if (saved.length === 0) {
        const savedCall = yield call(fetchSavedTracks);
        if (savedCall.data.success) {
          yield put({
            type: actions.setSavedTracks,
            payload: savedCall.data.result
          });
        }
        saved = savedCall.data.result;
      }
      saved = take(shuffle(saved), 20);
      uris = saved.map(val => {
        return val.track.uri;
      });
      break;
    case "Top Artists":
      const stats = yield select(getStats);
      const artistIDS = stats.artists.map((val)=> {
        return val.id;
      })
      const tracksReq = yield call(getTopArtistsTracks, artistIDS);
      if(tracksReq.data.success) {
        let tracks = []
        tracksReq.data.result.forEach(val => {
          tracks = [...tracks, ...val.tracks];
        })
        tracks = take(shuffle(tracks), 20);
        uris = tracks.map(val => {
          return val.uri;
        });
      }
      break;
    default: 
      break;
  }

  const nameList = [
    "cryptic lake",
    "i guess so",
    "singularity",
    "change my mind",
    "as long as you need",
    "this is it",
    "take it",
    "mess",
    "sad",
    "waiting here for you",
    "change your mind"
  ];
  const meta = {
    name: nameList[Math.floor(Math.random() * nameList.length)],
    description: "auto generated",
    collaborative: false,
    public: false
  };

  const result = yield call(createPlaylist, id, meta);
  if (result.data.success) {
    yield put({ type: actions.addPlaylist, payload: result.data.result });
  }
  const playlist_id = result.data.result.id;
  uris = shuffle(uris)
  yield call(addPlaylistTracks, playlist_id, {
    uris: uris
  });
};

const SpotifySaga = function* Auth() {
  yield takeEvery(actions.fetchPlaylists, fetchPlaylistsAction);
  yield takeEvery(actions.fetchPlaylistsTracks, fetchPlaylistTracksAction);
  yield takeEvery(actions.fetchStats, fetchStatsAction);
  yield takeEvery(actions.reorder, reorderAction);
  yield takeEvery(actions.deleteTracks, deleteTracksAction);
  yield takeEvery(actions.deletePlaylist, deletePlaylistAction);
  yield takeEvery(actions.createPlaylist, createPlaylistAction);
  yield takeEvery(actions.fetchSavedTracks, fetchSavedTracksAction);
  yield takeEvery(actions.addPlaylistTracks, addPlaylistTracksAction);
  yield takeEvery(actions.generate, generateAction);
};

export default SpotifySaga;
