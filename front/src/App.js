import React, { Component } from "react";
import { Route, Router } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUser } from "../src/reducers/auth";
import { logoutCall } from "./reducers/auth";
import "./App.scss";
import { SideBar } from "./components/";
import history from "./history";
import { NavBar } from './components/index';

import Main from "./pages/main/screen";
import Login from "./pages/login/screen";
import PlayLists from "./pages/playlists/screen";
import Edit from './pages/edit/screen';
import Trending from './pages/trending/screen';
import Search from './pages/search/screen';
import Create from './pages/create/screen';

function isEmpty(obj) {
  return !Object.keys(obj).length;
}

const paths = [
  {name: "Dashboard", link: '/'},
  {name: "PlayLists", link: '/playlists'},
  {name: "Create", link: '/create'},
  {name: "Coming Soon", link: '/'},
  {name: "Sign Out", logout: true}
]

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDesktop: true,
    };
  }
  
  componentDidMount() {
    this.updatePredicate();
    window.addEventListener("resize", this.updatePredicate);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updatePredicate);
  }

  updatePredicate = () => {
    this.setState({ isDesktop: window.innerWidth > 600 });
  }

  componentWillMount() {
    if (isEmpty(this.props.auth.user)) {
      this.props.fetchUser();
    }
  }

  render() {
    const { isDesktop } = this.state;
    const { user } = this.props.auth;
    const { logoutCall } = this.props;
    return (
      <React.Fragment>
        {!isEmpty(user) && (
          <Router history={history}>
       
            <div className="container">
              {isDesktop && <SideBar user={user} logout={logoutCall} />}
              {!isDesktop && <NavBar paths={paths} logout={logoutCall}/>}
              <Route path="/" exact component={Main} />
              <Route path="/playlists" exact component={PlayLists} />
              <Route path="/edit/:id" exact component={Edit} />
              <Route path="/trending" exact component={Trending} />
              <Route path="/search" exact component={Search} />
              <Route path="/create" exact component={Create}/>
            </div>
          </Router>
        )}
        {isEmpty(user) && <Login />}
      </React.Fragment>

    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {
    fetchUser,
    logoutCall
  }
)(App);
