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
      <div className="Dashboard">
        <div className="Dashboard-body">
          <div className="Dashboard-playlists">   
            {playlists &&
              playlists.map((val, key) => {
                return (
                  <Link
                    key={key}
                    to={`/edit/${val.id}`}
                    className="Dashboard-playlist"
                    style={{
                      background: val.images[0]
                        ? `url(${val.images[0].url}) center`
                        : "black"
                    }}
                  >
                    <div className="Dashboard-playlistName">{val.name}</div>
                  </Link>
                );
              })}
          </div>

          <div className="Dashboard-trending">
            <div className="Dashboard-title">Your Tracks</div>
            <div className="Dashboard-topArtists">
              {stats.tracks.map((val, key) => {
                return (
                  <div
                    class="Dashboard-topArtist"
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
            <div className="Dashboard-title">Your Artists</div>
            <div className="Dashboard-topTracks">
              {stats.artists.map((val, key) => {
                return (
                  <div
                    className="Dashboard-topTrack"
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
