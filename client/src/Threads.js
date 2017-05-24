import React, {Component} from 'react';
import {Button, Form, FormControl, FormGroup, Table} from 'react-bootstrap';

import {baseURL} from './config.json';
import './Threads.css';

class Threads extends Component {
  constructor() {
    super();
    this.state = {
      threads: [],
    };
  }

  fetchThreads() {
    fetch(`${baseURL}/threads.php`)
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          threads: json || [],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  createThread(event) {
    event.preventDefault();
    let form = document.querySelector('form');
    let formData = new FormData(form);
    formData.append('original_poster', this.props.user.id);

    fetch(`${baseURL}/thread_add.php`, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .catch((err) => {
        console.log(err);
      });

    form.reset();
    setTimeout(() => this.fetchThreads(), 500);
  }

  deleteThread(threadId, event) {
    event.preventDefault();
    event.stopPropagation();

    let formData = new FormData();
    formData.append('thread_id', threadId);

    fetch(`${baseURL}/thread_del.php`, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .catch((err) => {
        console.log(err);
      });

    setTimeout(() => this.fetchThreads(), 500);
  }

  componentDidMount() {
    this.fetchThreads();
  }

  render() {
    let threads = this.state.threads.map(
      ({id, title, dateCreated, poster, posterId}) => {
        let canDelete = false;
        if (this.props.user) {
          if (Number(this.props.user.level) === 0) {
            canDelete = true;
          } else if (Number(this.props.user.id) === Number(posterId)) {
            canDelete = true;
          }
        }

        let clickHandler = this.props.displayMessages.bind(this, {
          id,
          title,
          dateCreated,
          poster,
        });

        return (
          <tr className="highlight" onClick={clickHandler} key={id.toString()}>
            <td>{id}</td>
            <td>{dateCreated}</td>
            <td>{poster}</td>
            <td>{title}</td>
            <td>
              <ButtonDelete
                canDelete={canDelete}
                clickHandler={this.deleteThread.bind(this)}
                threadId={id}
              />
            </td>
          </tr>
        );
      }
    );

    let loggedIn = this.props.user ? true : false;

    return (
      <div>
        <Table striped>
          <thead>
            <tr>
              <th>#</th>
              <th>Дата создания</th>
              <th>ОП</th>
              <th>Название</th>
            </tr>
          </thead>
          <tbody>
            {threads}
          </tbody>
        </Table>
        <FormCreate
          loggedIn={loggedIn}
          createThread={this.createThread.bind(this)}
        />
      </div>
    );
  }
}

class FormCreate extends Component {
  render() {
    if (this.props.loggedIn) {
      return (
        <Form inline onSubmit={this.props.createThread}>
          <FormGroup>
            <FormControl type="text" name="title" placeholder="Тема" />
          </FormGroup>
          {' '}
          <Button type="submit">Добавить</Button>
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
        this.props.threadId
      );
      return (
        <Button bsStyle="danger" onClick={clickHandler}>
          Удалить
        </Button>
      );
    }

    return null;
  }
}

export default Threads;
