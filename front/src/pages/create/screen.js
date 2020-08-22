import React from "react";
import { connect } from "react-redux";
import "./create.scss";
import { createPlaylist, generate } from "../../reducers/spotify";
import history from "../../history";
import { Modal } from "../../components";
const GenOptions = ["Saved Songs", "Top Artists"];

class Create extends React.Component {
  state = {
    name: "",
    description: "",
    privateBool: false,
    collaborativeBool: false,
    showAlertCreate: false
  };

  changeName = e => {
    this.setState({
      name: e.target.value
    });
  };

  changeDescription = e => {
    this.setState({
      description: e.target.value
    });
  };

  changePrivate = e => {
    this.setState({
      privateBool: !this.state.privateBool
    });
  };

  changeCollaborative = e => {
    this.setState({
      collaborativeBool: !this.state.collaborativeBool
    });
  };

  onDismiss = () => {
    this.setState({
      showAlertCreate: false
    });
  };

  onCreate = () => {
    if (this.state.name.length !== 0) {
      this.setState({
        showAlertCreate: true
      });
    }
  };

  onSubmit = () => {
    if (this.state.name.length !== 0) {
      this.props.createPlaylist({
        id: this.props.user.data.spotID,
        meta: {
          name: this.state.name,
          description: this.state.description,
          collaborative: this.state.collaborativeBool,
          public: !this.state.privateBool
        }
      });
      history.push("/");
    }
  };

  actions = (
    <React.Fragment>
      <button
        className="ui button negative"
        onClick={() => {
          this.onSubmit();
          this.setState({
            showAlertCreate: false
          });
        }}
      >
        Create
      </button>
      <button className="ui button" onClick={this.onDismiss}>
        Cancel
      </button>
    </React.Fragment>
  );

  render() {
    const {
      name,
      description,
      privateBool,
      collaborativeBool,
      showAlertCreate
    } = this.state;
    const { generate } = this.props;
    return (
      <React.Fragment>
        <div className="create-container">
          {/* <div className="create-body">
            <div className="create-title">Create a PlayList:</div>
            <div className="input-box">
              <label>Name: </label>
              <input
                type="text"
                className="name-input"
                value={name}
                onChange={this.changeName}
              />
            </div>
            <div className="input-box">
              <label>Description: </label>
              <input
                type="text"
                className="desc-input"
                value={description}
                onChange={this.changeDescription}
              />
            </div>

            <div className="input-row-box">
              <div className="input-row-box">
                <label className="label-toggles">Private</label>
                <input
                  type="checkbox"
                  name="public"
                  value={privateBool}
                  onChange={this.changePrivate}
                />
              </div>

              <div className="input-row-box">
                {privateBool && (
                  <React.Fragment>
                    <label className="label-toggles">Collaborative</label>
                    <input
                      type="checkbox"
                      name="public"
                      value={collaborativeBool}
                      onChange={this.changeCollaborative}
                    />
                  </React.Fragment>
                )}
              </div>
            </div>

            <div className="input-row-box">
              <div className="create-options">
                <div className="create-option" onClick={this.onCreate}>
                  create
                </div>
              </div>

              {/* <div className="create-options">
              <Link className="create-option" to="/playlists">
                cancel
              </Link>
            </div> 
            </div>
          </div> */}

          <div className="create-gen">
            {/* <div className="input-box">
              <label>Name: </label>
              <input
                type="text"
                className="name-input"
                value={name}
                placeholder="Playlist Name"
                onChange={this.changeName}
              />
            </div>
            <div className="input-box">
              <label>Description: </label>
              <input
                type="text"
                className="desc-input"
                value={description}
                placeholder="Description"
                onChange={this.changeDescription}
              />
            </div> */}
            <div className="gen-choices">
              {GenOptions.map((val, idx) => (
                <div
                  className="gen-choice"
                  key={idx}
                  onClick={() => {
                    generate(val);
                    history.push("/playlists");
                  }}
                >
                  {val}
                </div>
              ))}
            </div>
          </div>
        </div>
        {showAlertCreate && (
          <Modal
            title="Create Alert"
            content="Are you sure about creating this playlist?"
            actions={this.actions}
            onDismiss={this.onDismiss}
          />
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});
export default connect(
  mapStateToProps,
  {
    createPlaylist,
    generate
  }
)(Create);
