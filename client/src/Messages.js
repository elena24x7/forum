import React, { Component } from 'react';
import { Button, Form, FormGroup, FormControl, ListGroup, ListGroupItem } from 'react-bootstrap';

import { baseURL } from './config.json';

class Messages extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      threadId: null
    };
  }

  fetchMessages() {
    fetch(`${baseURL}/messages.php?thread_id=${this.props.threadId}`)
      .then(response => response.json())
      .then(json => {
        this.setState({
          messages: json || [],
          threadId: this.props.threadId
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  postMessage(event) {
    event.preventDefault();
    let form = document.querySelector('form');
    let formData = new FormData(form);
    formData.append('poster', this.props.user.id);
    formData.append('thread_id', this.props.threadId);

    fetch(`${baseURL}/message_add.php`, {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .catch(err => {
        console.log(err);
      });

    form.reset();
    this.fetchMessages();
  }

  componentDidMount() {
    this.fetchMessages();
  }

  render() {
    const ReplyTo = props => {
      if (props.replyToName) {
        return <span> в ответ {props.replyToName}</span>;
      } else {
        return null;
      }
    };

    const messages = this.state.messages.map(
      ({ id, body, datePosted, poster, posterName, replyToName }) => {
        return (
          <ListGroupItem key={id.toString()}>
            <h4>{posterName} ({poster})</h4>
            <p>{body}</p>
            <span>в {datePosted}</span>
            <ReplyTo replyToName={replyToName} />
          </ListGroupItem>
        );
      }
    );

    return (
      <div>
        <ListGroup>
          {messages}
        </ListGroup>
        <MessageForm
          loggedIn={this.props.loggedIn}
          postMessage={this.postMessage.bind(this)}
        />
      </div>
    );
  }
}

class MessageForm extends Component {
  render() {
    if (this.props.loggedIn) {
      return (
        <Form inline onSubmit={this.props.postMessage}>
          <FormGroup>
            <FormControl type="text" name="body" placeholder="Сообщение" />
          </FormGroup>
          {' '}
          <Button type="submit">Написать</Button>
        </Form>
      );
    } else {
      return null;
    }
  }
}

export default Messages;
