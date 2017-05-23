import React, { Component } from 'react';
import { Grid, PageHeader } from 'react-bootstrap';

import LoginForm from './LoginForm';
import Messages from './Messages';
import Threads from './Threads';
import { baseURL } from './config.json';

class App extends Component {
  constructor() {
    super();
    this.state = {
      display: 'threads',
      threadId: null,
      user: null
    };
  }

  displayMessages(id) {
    this.setState({
      display: 'messages',
      threadId: id
    });
  }

  logIn(event) {
    event.preventDefault();
    let form = document.querySelector('form');

    fetch(`${baseURL}/login.php`, { method: 'POST', body: new FormData(form) })
      .then(response => response.json())
      .then(json => {
        this.setState({
          user: json[0]
        });
      })
      .catch(err => {
        console.log(err);
      });

    form.reset();
  }

  render() {
    let Body = () => {
      if (this.state.display === 'messages') {
        return <Messages threadId={this.state.threadId} />;
      }

      let loggedIn = this.state.user || false;

      return (
        <Threads
          user={this.state.user}
          loggedIn={loggedIn}
          displayMessages={this.displayMessages.bind(this)}
        />
      );
    };

    let UserForm = () => {
      if (this.state.user) {
        return null;
      }

      return <LoginForm clickHandler={this.logIn.bind(this)} />;
    };

    return (
      <Grid fluid>
        <PageHeader>
          Форум
          <UserForm />
        </PageHeader>
        <Body />
      </Grid>
    );
  }
}

export default App;
