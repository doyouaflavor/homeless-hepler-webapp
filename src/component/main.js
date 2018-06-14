import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Form from './Form';


const Main = () => (
  <Switch>
{/*     <Route exact path="/" component={LandingPage} /> */}
    <Route path="/Form" component={Form} />
  </Switch>
)

export default Main;