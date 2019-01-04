import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./playlists.scss";
import { ListItem } from "../../components";
import { deletePlaylist, fetchPlaylists} from "../../reducers/spotify";

class PlayLists extends React.Component {

  componentDidMount() {
    if (this.props.spotify.playlists.length === 0) {
      this.props.fetchPlaylists();
    }
  }

  onDelete = val => {
    this.props.deletePlaylist({
      playlist_id: val.id,
      current: this.props.spotify.playlists
    });
  };

  renderChoices = val => {
    return (
      <div className="playlist-buttons">
        <Link className="list-button" to={`/edit/${val.id}`}>
          Edit
        </Link>
        <div className="list-button" onClick={() => this.onDelete(val)}>
          Delete
        </div>
      </div>
    );
  };

  renderLabel = () => (
    <div className="playlist-buttons">
        <div className="list-section">
          Edit?
        </div>
        <div className="list-section">
          Delete?
        </div>
      </div>
  )

  render() {
    const playlists = this.props.spotify.playlists;
    return (
      <div className="main-container">
        <div className="edit-header">
          <div className="playlists-title">Playlists:</div>
          <div className="playlist-options">
            <Link className="playlist-option" to={"/create"}>
              create
            </Link>
          </div>
        </div>
        <div className="playlists-body">
          <ListItem
            first={"PLAYLIST NAME"}
            second={"OWNER"}
            third={"NUMBER OF SONGS"}
            renderChoices={this.renderLabel}
          />
          {playlists &&
            playlists.map((val, key) => {
              return (
                <ListItem
                  key={key}
                  first={val.name}
                  second={val.owner.display_name}
                  third={val.tracks.total}
                  renderChoices={() => this.renderChoices(val)}
                />
              );
            })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  spotify: state.spotify
});

const mapDispatchToProps = {
  deletePlaylist,
  fetchPlaylists
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayLists);
