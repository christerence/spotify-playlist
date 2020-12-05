import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./playlists.scss";
import { ListItem } from "../../components";
import { deletePlaylist, fetchPlaylists } from "../../reducers/spotify";
import { Modal } from "../../components";

class PlayLists extends React.Component {
  state = {
    showAlertDelete: false,
    chosenPlaylist: null,
  };

  componentDidMount() {
    if (this.props.spotify.playlists.length === 0) {
      this.props.fetchPlaylists();
    }
  }

  onDelete = (val) => {
    this.setState({
      showAlertDelete: true,
      chosenPlaylist: val,
    });
  };

  onDismiss = () => {
    this.setState({
      showAlertDelete: false,
      chosenPlaylist: null,
    });
  };

  actions = (
    <React.Fragment>
      <button
        className="ui button negative"
        onClick={() => {
          const { chosenPlaylist } = this.state;
          this.props.deletePlaylist({
            playlist_id: chosenPlaylist.id,
            current: this.props.spotify.playlists,
          });

          this.setState({
            showAlertDelete: false,
            chosenPlaylist: null,
          });
        }}
      >
        Delete
      </button>
      <button className="ui button" onClick={this.onDismiss}>
        Cancel
      </button>
    </React.Fragment>
  );

  renderChoices = (val) => {
    return (
      <React.Fragment>
        <Link className="list-section option col4" to={`/edit/${val.id}`}>
          edit
        </Link>
        <div className="list-section option delete col5" onClick={() => this.onDelete(val)}>
          delete
        </div>
      </React.Fragment>
    );
  };

  renderLabel = () => (
    <React.Fragment>
      <div className="list-section heading col4">Edit?</div>
      <div className="list-section heading col5">Delete?</div>
    </React.Fragment>
  );

  render() {
    const { showAlertDelete } = this.state;
    const playlists = this.props.spotify.playlists;
    return (
      <React.Fragment>
        <div className="Playlists">
          <div className="Playlists-body">
            <ListItem
              first={"Name"}
              second={"Owner"}
              third={"Songs"}
              renderChoices={this.renderLabel}
              modifier={"heading"}
            />
            {playlists &&
              playlists.map((val, key) => {
                return (
                  <ListItem
                    key={key}
                    images={val.images}
                    first={val.name}
                    second={val.owner.display_name}
                    third={val.tracks.total}
                    renderChoices={() => this.renderChoices(val)}
                  />
                );
              })}
          </div>
        </div>
        {showAlertDelete && (
          <Modal
            title="Delete Playlist"
            content="Are you sure about deleting this playlist?"
            actions={this.actions}
            onDismiss={this.onDismiss}
          />
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  spotify: state.spotify,
});

const mapDispatchToProps = {
  deletePlaylist,
  fetchPlaylists,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayLists);
