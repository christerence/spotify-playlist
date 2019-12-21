import React from "react";
import "./login.scss";
import { connect } from "react-redux";
import { login } from "../../reducers/auth";

class Login extends React.Component {
  render() {
    return (
      <div className="login-container">
        <div className="login-header">
          <p>Song Organizer</p>
        </div>
        <div className="login-button">
          <a href={"/auth/spotify"} className="login-spotify">
            LOG IN TO SPOTIFY
          </a>
        </div>

        <div className="login-footer">
          <p><b>created by:</b> christerence (github)</p>
          <p><b>last updated:</b> 12/21/19</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
