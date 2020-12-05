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
    showAlertCreate: false,
  };

  changeName = (e) => {
    this.setState({
      name: e.target.value,
    });
  };

  changeDescription = (e) => {
    this.setState({
      description: e.target.value,
    });
  };

  changePrivate = (e) => {
    this.setState({
      privateBool: !this.state.privateBool,
    });
  };

  changeCollaborative = (e) => {
    this.setState({
      collaborativeBool: !this.state.collaborativeBool,
    });
  };

  onDismiss = () => {
    this.setState({
      showAlertCreate: false,
    });
  };

  onCreate = () => {
    if (this.state.name.length !== 0) {
      this.setState({
        showAlertCreate: true,
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
          public: !this.state.privateBool,
        },
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
            showAlertCreate: false,
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
      showAlertCreate,
    } = this.state;
    const { generate } = this.props;
    return (
      <div className="Create">
        <div className="Create-container">
          <div className="Create-gen">
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
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});
export default connect(
  mapStateToProps,
  {
    createPlaylist,
    generate,
  }
)(Create);
