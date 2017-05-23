import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';

import { LoginForm } from './Forms';
import Messages from './Messages';
import Threads from './Threads';

class App extends Component {
  constructor() {
    super();
    this.state = {
      display: 'threads',
      threadId: null
    };
  }

  displayMessages(id) {
    this.setState({
      display: 'messages',
      threadId: id
    });
  }

  render() {
    let Body = () => {
      if (this.state.display === 'messages') {
        return <Messages threadId={this.state.threadId} />;
      }

      return <Threads clickHandler={this.displayMessages.bind(this)} />;
    };

    return (
      <Grid fluid>
        <LoginForm />
        <Body />
      </Grid>
    );
  }
}

export default App;
