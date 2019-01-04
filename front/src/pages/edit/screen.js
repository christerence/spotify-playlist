import React from "react";
import { connect } from "react-redux";
import {
  fetchPlaylistsTracks,
  emptyPlayListTracks,
  setPlaylistsTracks,
  reorder,
  deleteTracks,
  fetchSavedTracks,
  addPlaylistTracks
} from "../../reducers/spotify";
import { SortableContainer, arrayMove } from "react-sortable-hoc";
import { SortableItem, ListItemSmall, SelectableListItemSmall } from "../../components";
import { find, hasIn, remove, countBy } from "lodash";
import { Radar } from "react-chartjs";
import "./edit.scss";

import axios from "axios";

const SortableList = SortableContainer(props => {
  return (
    <ul className="edit-body">
      <ListItemSmall
        first={"SONG"}
        second={"ARTIST"}
        third={"ALBUM"}
      />
      {props.items.map((val, index) => (
        <SortableItem
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
    artists: []
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.fetchPlaylistsTracks(id);
    if (this.props.savedTracks.length === 0) {
      this.props.fetchSavedTracks();
    }
  }

  componentWillUnmount() {
    this.props.emptyPlayListTracks();
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.props.reorder({
      playlist_id: this.props.match.params.id,
      newList: arrayMove(this.props.tracks, oldIndex, newIndex),
      oldIdx: oldIndex,
      newIdx: newIndex
    });
  };

  toggleDelete = () => {
    this.setState({
      deleteState: !this.state.deleteState
    });
  };

  onSaveDelete = () => {
    this.props.deleteTracks({
      playlist_id: this.props.match.params.id,
      deleted: this.state.deleted,
      current: this.props.tracks
    });
    this.toggleDelete();
  };

  onSaveAdd = () => {
    this.props.addPlaylistTracks({
      playlist_id: this.props.match.params.id,
      added: this.state.added,
      current: this.props.tracks
    });
    this.toggleAdd();
  };

  onClickCheckDelete = (val, key) => {
    const { deleted } = this.state;
    const check = find(deleted, o => (o.track.id === val.track.id));
    if (check !== undefined && check.key !== undefined) {
      remove(deleted, o => (o.track.id === val.track.id && key === o.key));
    } else {
      deleted.push({...val, key: key});
    }
    this.setState({
      deleted
    });
  };

  onClickCheckAdd = val => {
    const { added } = this.state;
    if (find(added, o => o.track.id === val.track.id) !== undefined) {
      remove(added, o => o.track.id === val.track.id);
    } else {
      added.push(val);
    }
    this.setState({
      added
    });
  };

  toggleAdd = () => {
    this.setState({
      addState: !this.state.addState
    });
  };

  toggleClose = () => {
    this.setState({
      addState: false,
      deleteState: false
    });
  };

  toggleStats = () => {
    const { tracks } = this.props;
    if (!this.state.statsState) {
      axios
        .get("/spotify/artists", {
          params: {
            ids: tracks.map(val => val.track.artists[0].id)
          }
        })
        .then(res => {
          if (res.data.success) {
            this.setState({
              statsState: !this.state.statsState,
              artists: res.data.result.artists
            });
          } else {
            this.setState({
              statsState: !this.state.statsState,
              artists: []
            });
          }
        });
    } else {
      this.setState({
        statsState: false
      });
    }
  };

  renderTable = () => {
    const { artists } = this.state;
    const genres = [];
    artists.forEach(val => {
      val.genres.forEach(genre => {
        genres.push(genre);
      });
    });

    const parsedData = countBy(genres);
    const data = {
      labels: Object.keys(parsedData),
      datasets: [
        {
          data: Object.values(parsedData)
        }
      ]
    };

    const options = {
      legend: {
        position: "top"
      },
      title: {
        display: true,
        text: "Chart.js Radar Chart"
      },
      scale: {
        reverse: false,
        gridLines: {
          color: [
            "black",
            "red",
            "orange",
            "yellow",
            "green",
            "blue",
            "indigo",
            "violet"
          ]
        },
        ticks: {
          beginAtZero: true
        }
      }
    };

    return (
      <div className="graph-body">
        <Radar data={data} options={options} width="600" height="600" />
      </div>
    );
  };

  render() {
    const { deleteState, addState, statsState } = this.state;
    const { tracks, playlists, savedTracks } = this.props;
    const playlist = playlists
      ? find(playlists, val => {
          return val.id === this.props.match.params.id;
        })
      : {};

    return (
      <div className="main-container">
        <div className="edit-header">
          <div className="edit-options">
            <div className="edit-option" onClick={this.toggleStats}>
              {statsState ? "close" : "stats"}
            </div>
          </div>

          <div
            className="edit-title"
            style={{
              background:
                playlist && playlist.images[0]
                  ? `url(${playlist.images[0].url}) center`
                  : "black"
            }}
          >
            {playlist ? playlist.name : "PlayList"}
          </div>
          {(deleteState || addState) && (
            <div className="edit-options">
              <div
                className="edit-option"
                onClick={deleteState ? this.onSaveDelete : this.onSaveAdd}
              >
                save
              </div>
              <div className="edit-option" onClick={this.toggleClose}>
                cancel
              </div>
            </div>
          )}
          {!deleteState && !addState && (
            <div className="edit-options">
              <div className="edit-option" onClick={this.toggleAdd}>
                Add
              </div>
              <div className="edit-option" onClick={this.toggleDelete}>
                Delete
              </div>
            </div>
          )}
        </div>

        <div className="playlist-body-whole">
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
            <ul className="edit-body">
              <ListItemSmall
                first={"PLAYLIST NAME"}
                second={"OWNER"}
                third={"NUMBER OF SONGS"}
                renderChoices={this.renderLabel}
              />
              {tracks.map((val, index) => (
                <ListItemSmall
                  key={index}
                  first={val.track.name}
                  second={val.track.artists[0].name}
                  third={val.track.album.name}
                  renderChoices={() => {
                    return (
                      <div className="edit-delete" onClick={this.onDelete}>
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
            <div className="recommended-body">
              <div className="recommended-title">Recommended Songs:</div>

              <div className="recommended-song-list">
                <ul className="saved-tracks">
                  {savedTracks.map((val, index) => (
                    <SelectableListItemSmall
                      key={index}
                      first={val.track.name}
                      second={val.track.artists[0].name}
                      renderChoices={() => {
                        return (
                          <div className="edit-delete" onClick={this.onDelete}>
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

const mapStateToProps = state => ({
  tracks: state.spotify.currentTracks,
  playlists: state.spotify.playlists,
  savedTracks: state.spotify.savedTracks
});

const mapDispatchToProps = {
  fetchPlaylistsTracks,
  emptyPlayListTracks,
  setPlaylistsTracks,
  reorder,
  deleteTracks,
  fetchSavedTracks,
  addPlaylistTracks
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Edit);
