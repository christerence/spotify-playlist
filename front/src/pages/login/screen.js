import React from "react";
import "./login.scss";
import { connect } from "react-redux";
import { login } from "../../reducers/auth";

class Login extends React.Component {
  render() {
    return (
      <div className="Login">
        <h1 className="Login-header">Song Organizer</h1>
        <div className="Login-body">
          <a href={"/auth/spotify"} className="Login-button Login-spotify">
            login
          </a>
        </div>
        <div className="Login-footer">
          <p>
            <b>created by:</b>
            <a href="https://github.com/christerence">christerence</a>
            <a href="https://github.com/christerence/spotify-playlist">
              (@repo)
            </a>
          </p>
          <p>
            <b>last updated:</b> 08/19/20
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {
  login,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
