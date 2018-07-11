import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Home from './component/Home';
import Form from './component/Form';
import Admin from './component/Admin';
import Footer from './component/Footer';

class App extends Component {

  render() {
    return (
      <div>
        <Route exact path="/" component={Home} />
        <Route path="/form" component={Form} />
        <Route path="/admin" component={Admin} />
        <Route
          render={({ location }) => {
            if (location.pathname.startsWith('/admin')) {
              return null
            }

            return (
              <Footer/>
            )
          }}
        />
      </div>
    );
  }
}

export default App;
