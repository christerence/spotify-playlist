import React, { Component } from "react";
import { Route, Router } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUser } from "../src/reducers/auth";
import { logoutCall } from "./reducers/auth";
import "./App.scss";
import { NavBar, Modal } from "./components/";
import history from "./history";

import Main from "./pages/main/screen";
import Login from "./pages/login/screen";
import PlayLists from "./pages/playlists/screen";
import Edit from "./pages/edit/screen";
import Trending from "./pages/trending/screen";
import Search from "./pages/search/screen";
import Create from "./pages/create/screen";

function isEmpty(obj) {
  return !Object.keys(obj).length;
}

const paths = [
  { name: "Dashboard", link: "/" },
  { name: "Playlists", link: "/playlists" },
  { name: "Create", link: "/create" },
  { name: "Sign Out", logout: true },
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logoutAction: false,
    };
  }

  componentWillMount() {
    if (isEmpty(this.props.auth.user)) {
      this.props.fetchUser();
    }
  }

  onDismiss = () => {
    this.setState({
      logoutAction: false,
    });
  };

  onLogoutCall = () => {
    this.setState({
      logoutAction: true,
    });
  };

  actions = (
    <React.Fragment>
      <button
        className="ui button negative"
        onClick={() => {
          this.setState({
            logoutAction: false,
          });
          this.props.logoutCall();
        }}
      >
        Sign Out
      </button>
      <button className="ui button" onClick={this.onDismiss}>
        Cancel
      </button>
    </React.Fragment>
  );

  render() {
    const { logoutAction } = this.state;
    const { user } = this.props.auth;
    return (
      <React.Fragment>
        {!isEmpty(user) && (
          <Router history={history}>
            <div className="container">
              <NavBar user={user} paths={paths} logout={this.onLogoutCall} />
              <Route path="/" exact component={Main} />
              <Route path="/playlists" exact component={PlayLists} />
              <Route path="/edit/:id" exact component={Edit} />
              <Route path="/trending" exact component={Trending} />
              <Route path="/search" exact component={Search} />
              <Route path="/create" exact component={Create} />
            </div>
          </Router>
        )}
        {isEmpty(user) && <Login />}
        {logoutAction && (
          <Modal
            title="Sign Out"
            content="Are you sure about signing out?"
            actions={this.actions}
            onDismiss={this.onDismiss}
          />
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  {
    fetchUser,
    logoutCall,
  }
)(App);
