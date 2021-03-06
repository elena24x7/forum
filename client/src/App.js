import React, {Component} from 'react';
import {Grid, PageHeader} from 'react-bootstrap';

import LoginForm from './LoginForm';
import Messages from './Messages';
import Threads from './Threads';
import {baseURL} from './config.json';

class App extends Component {
  constructor() {
    super();
    this.state = {
      display: 'threads',
      thread: {
        id: null,
        title: null,
        dateCreated: null,
        poster: null,
      },
      user: null,
    };
  }

  displayMessages(thread) {
    this.setState({
      display: 'messages',
      thread: thread,
    });
  }

  logIn(event) {
    event.preventDefault();
    let form = document.querySelector('form');

    fetch(`${baseURL}/login.php`, {method: 'POST', body: new FormData(form)})
      .then((response) => response.json())
      .then((json) => {
        sessionStorage.setItem('user', JSON.stringify(json[0]));
        this.setState({
          user: json[0],
        });
      })
      .catch((err) => {
        console.log(err);
      });

    form.reset();
  }

  componentWillMount() {
    this.setState({
      user: JSON.parse(sessionStorage.getItem('user')),
    });
  }

  render() {
    let Body = () => {
      if (this.state.display === 'messages') {
        return <Messages user={this.state.user} thread={this.state.thread} />;
      }

      return (
        <Threads
          user={this.state.user}
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
