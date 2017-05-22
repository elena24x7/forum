import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';

import Threads from './Threads';
import { LoginForm } from './Forms';

class App extends Component {
  render() {
    return (
      <Grid fluid>
        <LoginForm />
        <Threads />
      </Grid>
    );
  }
}

export default App;
