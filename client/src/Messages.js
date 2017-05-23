import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

import { baseURL } from './config.json';

class Messages extends Component {
  constructor() {
    super();
    this.state = {
      messages: []
    };
  }

  componentDidMount() {
    fetch(`${baseURL}/messages.php?thread_id=${this.props.threadId}`)
      .then(response => response.json())
      .then(json => {
        this.setState({
          messages: json
        });
      })
      .catch(err => {
        console.log(err);
      });
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
      <ListGroup>
        {messages}
      </ListGroup>
    );
  }
}

export default Messages;
