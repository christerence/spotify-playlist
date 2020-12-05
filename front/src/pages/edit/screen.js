import React from "react";
import { connect } from "react-redux";
import {
  fetchPlaylistsTracks,
  fetchPlaylists,
  emptyPlayListTracks,
  setPlaylistsTracks,
  reorder,
  deleteTracks,
  fetchSavedTracks,
  addPlaylistTracks,
} from "../../reducers/spotify";
import { SortableContainer, arrayMove } from "react-sortable-hoc";
import {
  SortableItem,
  ListItem,
  SelectableListItemSmall,
} from "../../components";
import { find, remove, countBy, take } from "lodash";
import { Radar } from "react-chartjs";

import "./edit.scss";

import axios from "axios";

const SortableList = SortableContainer((props) => {
  return (
    <ul className="Edit-body">
      <ListItem
        hideColZero={true}
        first={"Song"}
        second={"Artist"}
        third={"Album"}
        modifier="heading"
      />
      {props.items.map((val, index) => (
        <SortableItem
          hideColZero={true}
          key={`item-${index}`}
          index={index}
          value={val}
          first={val.track.name}
          second={val.track.artists[0].name}
          third={val.track.album.name}
        />
      ))}
    </ul>
  );
});

class Edit extends React.Component {
  state = {
    deleted: [],
    added: [],
    deleteState: false,
    addState: false,
    statsState: false,
    artists: [],
    isDesktop: false,
  };

  updatePredicate = () => {
    this.setState({ isDesktop: window.innerWidth > 600 });
  };

  componentDidMount() {
    this.updatePredicate();
    window.addEventListener("resize", this.updatePredicate);
    const id = this.props.match.params.id;
    this.props.fetchPlaylistsTracks(id);
    if (this.props.savedTracks.length === 0) {
      this.props.fetchSavedTracks();
    }
    if (this.props.playlists.length === 0) {
      this.props.fetchPlaylists();
    }
  }

  componentWillUnmount() {
    this.props.emptyPlayListTracks();
    window.removeEventListener("resize", this.updatePredicate);
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.props.reorder({
      playlist_id: this.props.match.params.id,
      newList: arrayMove(this.props.tracks, oldIndex, newIndex),
      oldIdx: oldIndex,
      newIdx: newIndex,
    });
  };

  toggleDelete = () => {
    this.setState({
      deleteState: !this.state.deleteState,
    });
  };

  onSaveDelete = () => {
    this.props.deleteTracks({
      playlist_id: this.props.match.params.id,
      deleted: this.state.deleted,
      current: this.props.tracks,
    });
    this.toggleDelete();
  };

  onSaveAdd = () => {
    this.props.addPlaylistTracks({
      playlist_id: this.props.match.params.id,
      added: this.state.added,
      current: this.props.tracks,
    });
    this.toggleAdd();
  };

  onClickCheckDelete = (val, key) => {
    const { deleted } = this.state;
    const check = find(deleted, (o) => o.track.id === val.track.id);
    if (check !== undefined && check.key !== undefined) {
      remove(deleted, (o) => o.track.id === val.track.id && key === o.key);
    } else {
      deleted.push({ ...val, key: key });
    }
    this.setState({
      deleted,
    });
  };

  onClickCheckAdd = (val) => {
    const { added } = this.state;
    if (find(added, (o) => o.track.id === val.track.id) !== undefined) {
      remove(added, (o) => o.track.id === val.track.id);
    } else {
      added.push(val);
    }
    this.setState({
      added,
    });
  };

  toggleAdd = () => {
    this.setState({
      addState: !this.state.addState,
    });
  };

  toggleClose = () => {
    this.setState({
      addState: false,
      deleteState: false,
    });
  };

  toggleStats = () => {
    const { tracks } = this.props;
    if (!this.state.statsState) {
      axios
        .get("/spotify/artists", {
          params: {
            ids: take(tracks.map((val) => val.track.artists[0].id), 50),
          },
        })
        .then((res) => {
          if (res.data.success) {
            this.setState({
              statsState: !this.state.statsState,
              artists: res.data.result.artists,
            });
          } else {
            this.setState({
              statsState: !this.state.statsState,
              artists: [],
            });
          }
        });
    } else {
      this.setState({
        statsState: false,
      });
    }
  };

  renderTable = () => {
    const { artists, isDesktop } = this.state;
    const genres = [];
    artists.forEach((val) => {
      val.genres.forEach((genre) => {
        genres.push(genre);
      });
    });

    const parsedData = countBy(genres);
    const data = {
      labels: Object.keys(parsedData),
      datasets: [
        {
          fillColor: "rgba(45, 185, 76, 0.4)",
          data: Object.values(parsedData),
        },
      ],
    };

    return (
      <div className="graph-body">
        <Radar
          data={data}
          options={{}}
          width={isDesktop ? "600" : "400"}
          height={isDesktop ? "600" : "400"}
        />
      </div>
    );
  };

  render() {
    const { deleteState, addState, statsState } = this.state;
    const { tracks, playlists, savedTracks } = this.props;
    const playlist = playlists
      ? find(playlists, (val) => {
          return val.id === this.props.match.params.id;
        })
      : {};
    return (
      <div className="Edit">
        <div className="Edit-header">
          {playlist ? (
            <React.Fragment>
              <div className="Edit-imgWrapper">
                {playlist.images && playlist.images.length > 0 && (
                  <img
                    className="Edit-img"
                    src={playlist.images[0].url}
                    alt="Playlist Picture"
                  />
                )}
              </div>
              <div className="Edit-title">
                {playlist ? playlist.name : "Playlist"}
              </div>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <div className="Edit-imgWrapper js-hidden">
                <span className="sr-only">image wrapper</span>
              </div>
              <div className="Edit-title js-hidden">
                <span className="sr-only">title</span>
              </div>
            </React.Fragment>
          )}

          <div className="Edit-options">
            <div className="Edit-option" onClick={this.toggleStats}>
              {statsState ? "Close" : "Statistics"}
            </div>

            {(deleteState || addState) && (
              <React.Fragment>
                <div
                  className="Edit-option"
                  onClick={deleteState ? this.onSaveDelete : this.onSaveAdd}
                >
                  Save
                </div>
                <div className="Edit-option" onClick={this.toggleClose}>
                  Cancel
                </div>
              </React.Fragment>
            )}
            {!statsState && !deleteState && !addState && (
              <React.Fragment>
                {/* <div className="Edit-option" onClick={this.toggleAdd}>
                  Add
                </div> */}
                <div className="Edit-option" onClick={this.toggleDelete}>
                  Delete
                </div>
              </React.Fragment>
            )}
          </div>
        </div>

        <div className="Edit-container">
          {!statsState && !deleteState && (
            <React.Fragment>
              <SortableList
                items={tracks}
                onSortEnd={this.onSortEnd}
                onDelete={this.onDelete}
              />
            </React.Fragment>
          )}

          {!statsState && deleteState && (
            <ul className="Edit-body">
              <ListItem
                hideColZero={true}
                first={"Song"}
                second={"Artist"}
                third={"Album"}
                modifier="heading"
                renderChoices={() => (
                  <div className="list-section heading col4">Delete</div>
                )}
              />
              {tracks.map((val, index) => (
                <ListItem
                  hideColZero={true}
                  key={index}
                  first={val.track.name}
                  second={val.track.artists[0].name}
                  third={val.track.album.name}
                  renderChoices={() => {
                    return (
                      <div className="Edit-delete" onClick={this.onDelete}>
                        <input
                          type="checkbox"
                          onChange={() => this.onClickCheckDelete(val, index)}
                        />
                      </div>
                    );
                  }}
                />
              ))}
            </ul>
          )}

          {statsState && this.renderTable()}

          {addState && (
            <div className="Recommended-body">
              <div className="Recommended-title">Recommended Songs:</div>
              <div className="Recommended-songList">
                <ul className="Recommended-savedTracks">
                  {savedTracks.map((val, index) => (
                    <SelectableListItemSmall
                      hideColZero={true}
                      key={index}
                      first={val.track.name}
                      second={val.track.artists[0].name}
                      renderChoices={() => {
                        return (
                          <div className="Edit-delete" onClick={this.onDelete}>
                            <input
                              type="checkbox"
                              onChange={() => this.onClickCheckAdd(val)}
                            />
                          </div>
                        );
                      }}
                    />
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  tracks: state.spotify.currentTracks,
  playlists: state.spotify.playlists,
  savedTracks: state.spotify.savedTracks,
});

const mapDispatchToProps = {
  fetchPlaylistsTracks,
  emptyPlayListTracks,
  fetchPlaylists,
  setPlaylistsTracks,
  reorder,
  deleteTracks,
  fetchSavedTracks,
  addPlaylistTracks,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Edit);
