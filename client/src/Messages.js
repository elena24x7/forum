import React, {Component} from 'react';
import {
  Col,
  Button,
  Form,
  FormControl,
  FormGroup,
  InputGroup,
  ListGroup,
  ListGroupItem,
  Row,
} from 'react-bootstrap';

import {baseURL} from './config.json';
import './Messages.css';

class Messages extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      replyTo: {
        msg: null,
        name: null,
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
    if (this.state.replyTo.msg)
      formData.append('reply_to', this.state.replyTo.msg);

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
        msg: null,
        name: null,
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

  selectReplyTo(msg, name, event) {
    this.setState({
      replyTo: {
        msg,
        name,
      },
    });
  }

  componentDidMount() {
    this.fetchMessages();
  }

  render() {
    let ReplyTo = (props) => {
      if (props.msg) return <span> в ответ на сообщение #{props.msg}</span>;

      return null;
    };

    let parseObject = (object, action, accumulator = [], depth = 0) => {
      for (let key in object) {
        if (object.hasOwnProperty(key)) {
          let element = object[key];
          let result = action(element, depth);
          accumulator.push(result);
          if (element.replies) {
            parseObject(element.replies, action, accumulator, ++depth);
            depth--;
          }
        }
      }
      return accumulator;
    };

    let buildMessage = (msg, depth) => {
      const {id, body, datePosted, posterId, poster, posterName, replyTo} = msg;

      let canDelete = false;
      if (this.props.user) {
        if (
          Number(this.props.user.level) === 0 ||
          Number(this.props.user.level) === 1
        ) {
          canDelete = true;
        } else if (Number(this.props.user.id) === Number(posterId)) {
          canDelete = true;
        }
      }

      let clickHandler = this.selectReplyTo.bind(this, id, posterName);

      let styles = {marginLeft: `${depth * 2}em`};
      return (
        <ListGroupItem
          className="msg-item"
          style={styles}
          key={id.toString()}
          onClick={clickHandler}
        >
          <h4>{posterName} ({poster})</h4>
          <p>{body}</p>
          <span>Сообщение #{id} </span>
          <span>от {datePosted}</span>
          <ReplyTo msg={replyTo} />
          <ButtonDelete
            canDelete={canDelete}
            clickHandler={this.deleteMessage.bind(this)}
            messageId={id}
          />
        </ListGroupItem>
      );
    };

    let messageComponents = parseObject(this.state.messages, buildMessage);

    let loggedIn = this.props.user ? true : false;

    return (
      <div>
        <Row>
          <Col lg={12}>
            <h2>{this.props.thread.title}</h2>
            <ListGroup>
              {messageComponents}
            </ListGroup>
          </Col>
        </Row>
        <Row>
          <Col lg={12}>
            <MessageForm
              replyTo={this.state.replyTo}
              loggedIn={loggedIn}
              postMessage={this.postMessage.bind(this)}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

class MessageForm extends Component {
  render() {
    if (this.props.loggedIn) {
      let buttonText = 'Написать';

      if (this.props.replyTo.name)
        buttonText = `Ответить ${this.props.replyTo.name}`;

      return (
        <Form onSubmit={this.props.postMessage}>
          <FormGroup>
            <InputGroup>
              <FormControl type="text" name="body" placeholder="Сообщение" />
              <InputGroup.Button>
                <Button bsStyle="primary" type="submit">{buttonText}</Button>
              </InputGroup.Button>
            </InputGroup>
          </FormGroup>
        </Form>
      );
    } else {
      return null;
    }
  }
}

class ButtonDelete extends Component {
  render() {
    if (this.props.canDelete) {
      let clickHandler = this.props.clickHandler.bind(
        this,
        this.props.messageId
      );
      return (
        <Button
          bsStyle="danger"
          bsSize="xsmall"
          className="msg-del"
          onClick={clickHandler}
        >
          Удалить
        </Button>
      );
    }

    return null;
  }
}

export default Messages;
