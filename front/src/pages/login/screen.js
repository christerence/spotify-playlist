import React from "react";
import "./login.scss";
import { connect } from "react-redux";
import { login } from "../../reducers/auth";

class Login extends React.Component {
  render() {
    return (
      <div className="login-container">
        <div className="login-box">
          <div className="login-text login-header">Spotify Gen</div>
          <a href={"/auth/spotify"}>
            <div className="ui fluid large green submit button">
              <i className="spotify medium icon" />
              Connect with Spotify
            </div>
          </a>
          <div className="login-sub-header">
            curated playlist generator
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = {
  login
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
