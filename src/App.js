import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Home from './component/Home';
import Form from './component/Form';

class App extends Component {

  render() {
    return (
      <div>
        <Route exact path="/" component={Home} />
        <Route path="/form" component={Form} />
      </div>
    );
  }
}

export default App;
