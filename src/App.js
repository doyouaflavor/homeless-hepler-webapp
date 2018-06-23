import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Home from './component/Home';
import Form from './component/Form';
import Footer from './component/Footer';

class App extends Component {

  render() {
    return (
      <div>
        <Route exact path="/" component={Home} />
        <Route path="/form" component={Form} />
        <Footer/>
      </div>
    );
  }
}

export default App;
