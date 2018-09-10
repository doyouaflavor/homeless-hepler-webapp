import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './component/Home';
import Form from './component/Form';
import Admin from './component/Admin';
import Footer from './component/Footer';

import ga from './googleAnalytics';

const logPageView = () => {
  ga.navigate(window.location.pathname);

  return null;
}

class App extends Component {

  componentDidMount() {
    ga.initialize()
  }

  render() {
    return (
      <div>
        <Route path="/" component={logPageView} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/form" component={Form} />
          <Route path="/admin" component={Admin} />
        </Switch>
        <Footer/>
      </div>
    );
  }
}

export default App;
