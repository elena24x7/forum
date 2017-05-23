import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';

import { baseURL } from './config.json';
import { LoginForm } from './Forms';
import Threads from './Threads';

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    fetch(`${baseURL}/threads.php`)
      .then(response => response.json())
      .then(json => {
        this.setState({
          data: json
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  showMessages(event) {
    console.log(event);
  }

  render() {
    let props = { threads: this.state.data, clickHandler: this.showMessages };
    return (
      <Grid fluid>
        <LoginForm />
        <Threads {...props} />
      </Grid>
    );
  }
}

export default App;
