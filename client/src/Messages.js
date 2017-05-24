import React, {Component} from 'react';
import {
  Button,
  Form,
  FormGroup,
  FormControl,
  ListGroup,
  ListGroupItem,
} from 'react-bootstrap';

import {baseURL} from './config.json';

class Messages extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      replyTo: {
        posterId: null,
        poster: null,
        posterName: null,
      },
    };
  }

  fetchMessages() {
    fetch(`${baseURL}/messages.php?thread_id=${this.props.thread.id}`)
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          messages: json || [],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  postMessage(event) {
    event.preventDefault();
    let form = document.querySelector('form');
    let formData = new FormData(form);
    formData.append('poster', this.props.user.id);
    formData.append('thread_id', this.props.thread.id);
    if (this.state.replyTo.posterId)
      formData.append('reply_to', this.state.replyTo.posterId);

    fetch(`${baseURL}/message_add.php`, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .catch((err) => {
        console.log(err);
      });

    form.reset();

    this.setState({
      replyTo: {
        posterId: null,
        poster: null,
        posterName: null,
      },
    });

    setTimeout(() => this.fetchMessages(), 500);
  }

  deleteMessage(messageId, event) {
    event.preventDefault();
    event.stopPropagation();

    let formData = new FormData();
    formData.append('message_id', messageId);

    fetch(`${baseURL}/message_del.php`, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .catch((err) => {
        console.log(err);
      });

    setTimeout(() => this.fetchMessages(), 500);
  }

  selectReplyTo(posterId, poster, posterName, event) {
    this.setState({
      replyTo: {
        posterId,
        poster,
        posterName,
      },
    });
  }

  componentDidMount() {
    this.fetchMessages();
  }

  render() {
    const ReplyTo = (props) => {
      if (props.replyToName) {
        return <span> в ответ {props.replyToName}</span>;
      } else {
        return null;
      }
    };

    let messages = this.state.messages.map(
      ({id, body, datePosted, posterId, poster, posterName, replyToName}) => {
        let canDelete = false;
        if (this.props.user) {
          if (Number(this.props.user.level) === 0) {
            canDelete = true;
          } else if (Number(this.props.user.id) === Number(posterId)) {
            canDelete = true;
          }
        }

        let clickHandler = this.selectReplyTo.bind(
          this,
          posterId,
          poster,
          posterName
        );

        return (
          <ListGroupItem key={id.toString()} onClick={clickHandler}>
            <h4>{posterName} ({poster})</h4>
            <p>{body}</p>
            <span>в {datePosted}</span>
            <ReplyTo replyToName={replyToName} />
            <ButtonDelete
              canDelete={canDelete}
              clickHandler={this.deleteMessage.bind(this)}
              messageId={id}
            />
          </ListGroupItem>
        );
      }
    );

    let loggedIn = this.props.user ? true : false;

    return (
      <div>
        <h1>{this.props.thread.title}</h1>
        <ListGroup>
          {messages}
        </ListGroup>
        <MessageForm
          replyTo={this.state.replyTo}
          loggedIn={loggedIn}
          postMessage={this.postMessage.bind(this)}
        />
      </div>
    );
  }
}

class MessageForm extends Component {
  render() {
    if (this.props.loggedIn) {
      let buttonText = 'Написать';

      if (this.props.replyTo.posterId)
        buttonText = `Ответить ${this.props.replyTo.posterName}`;

      return (
        <Form inline onSubmit={this.props.postMessage}>
          <FormGroup>
            <FormControl type="text" name="body" placeholder="Сообщение" />
          </FormGroup>
          {' '}
          <Button bsStyle="primary" type="submit">{buttonText}</Button>
        </Form>
      );
    } else {
      return null;
    }
  }
}

class ButtonDelete extends Component {
  render() {
    let styles = {maxWidth: 100};

    if (this.props.canDelete) {
      let clickHandler = this.props.clickHandler.bind(
        this,
        this.props.messageId
      );
      return (
        <div style={styles}>
          <Button bsStyle="danger" bsSize="small" block onClick={clickHandler}>
            Удалить
          </Button>
        </div>
      );
    }

    return null;
  }
}

export default Messages;
