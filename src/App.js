import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Home from './component/Home';
import Form from './component/Form';
import Admin from './component/Admin';
import Footer from './component/Footer';
import { AuthContext } from './context';
import { getProfile, setProfile } from './utils';

import ga from './googleAnalytics';

const PROFILE_KEY = 'profile';

const logPageView = () => {
  ga.navigate(window.location.pathname);

  return null;
};

const AdminGuard = (props) => (
  <AuthContext.Consumer>
    {({ profile }) => (profile && profile.admin
      ? <Admin {...props} />
      : <Redirect to="/" />
    )}
  </AuthContext.Consumer>
);

class App extends Component {
  constructor(props) {
    super(props);

    this.setProfile = this.setProfile.bind(this);
    this.state = {
      profile: getProfile(),
      setProfile: this.setProfile,
    };
  }

  componentWillMount() {
    ga.initialize()
  }

  setProfile(profile) {
    this.setState({
      profile,
    });
    setProfile(profile);
  }

  render() {
    return (
      <AuthContext.Provider value={this.state}>
        <Route path="/" component={logPageView} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/form" component={Form} />
          <Route path="/admin" component={AdminGuard} />
        </Switch>
        <Footer/>
      </AuthContext.Provider>
    );
  }
}

export default App;
