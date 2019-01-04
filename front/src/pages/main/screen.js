import React, { Component } from "react";
import "./main.scss";
import { connect } from "react-redux";
import {
  fetchPlaylists,
  fetchPlaylistsTracks,
  fetchStats
} from "../../reducers/spotify";
import { Link } from "react-router-dom";

class Main extends Component {
  componentDidMount() {
    if (this.props.spotify.playlists.length === 0) {
      this.props.fetchPlaylists();
      this.props.fetchStats();
    }
  }
  render() {
    const playlists = this.props.spotify.playlists;
    const stats = {
      artists: this.props.spotify.stats.artists,
      tracks: this.props.spotify.stats.tracks
    };
    return (
      <div className="main-container">
        <div className="dash-title">Dashboard:</div>
        <div className="dash-body">
          <div className="user-playlists">
            {playlists &&
              playlists.map((val, key) => {
                return (
                  <Link
                    key={key}
                    to={`/edit/${val.id}`}
                    className="user-playlist"
                    style={{
                      background: val.images[0]
                        ? `url(${val.images[0].url}) center`
                        : "black"
                    }}
                  >
                    <div className="playlist-name">{val.name}</div>
                  </Link>
                );
              })}
          </div>

          <div className="user-trending">
            <div className="top-title">Top Tracks:</div>
            <div className="user-top-artists">
              {stats.tracks.map((val, key) => {
                return (
                  <div
                    key={key}
                    style={{
                      background: `url(${val.album.images[1].url}) center`
                    }}
                  >
                    <div className="playlist-sub-name">{val.name}</div>
                  </div>
                );
              })}
            </div>
            <div className="top-title">Top Artists:</div>
            <div className="user-top-tracks">
              {stats.artists.map((val, key) => {
                return (
                  <div
                    key={key}
                    style={{ background: `url(${val.images[0].url}) center` }}
                  >
                    <div className="playlist-sub-name">{val.name}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  spotify: state.spotify
});

const mapDispatchToProps = {
  fetchPlaylists,
  fetchPlaylistsTracks,
  fetchStats
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
