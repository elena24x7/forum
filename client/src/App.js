import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';

import Threads from './Threads';

class App extends Component {
  render() {
    return (
      <Grid fluid>
        <Threads />
      </Grid>
    );
  }
}

export default App;
