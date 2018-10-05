import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './component/Home';
import Form from './component/Form';
import Admin from './component/Admin';
import Footer from './component/Footer';
import { AuthContext } from './context';

import ga from './googleAnalytics';

const PROFILE_KEY = 'profile';

const logPageView = () => {
  ga.navigate(window.location.pathname);

  return null;
};

class App extends Component {
  constructor(props) {
    super(props);

    const profile = localStorage.getItem(PROFILE_KEY);
    this.setProfile = this.setProfile.bind(this);
    this.state = {
      profile: profile ? JSON.parse(profile) : null,
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
    if (profile) {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    } else {
      localStorage.removeItem(PROFILE_KEY);
    }
  }

  render() {
    return (
      <AuthContext.Provider value={this.state}>
        <Route path="/" component={logPageView} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/form" component={Form} />
          <Route path="/admin" component={Admin} />
        </Switch>
        <Footer/>
      </AuthContext.Provider>
    );
  }
}

export default App;
