import React, { Component } from 'react';
import { Button, Form, FormControl, FormGroup, Table } from 'react-bootstrap';

import { baseURL } from './config.json';
import './Threads.css';

class Threads extends Component {
  constructor() {
    super();
    this.state = {
      threads: []
    };
  }

  fetchThreads() {
    fetch(`${baseURL}/threads.php`)
      .then(response => response.json())
      .then(json => {
        this.setState({
          threads: json
        });
      })
      .catch(err => {
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
      body: formData
    })
      .then(response => response.json())
      .catch(err => {
        console.log(err);
      });

    form.reset();
    this.fetchThreads();
  }

  componentDidMount() {
    this.fetchThreads();
  }

  displayMessages(id) {
    return () => {
      this.props.displayMessages(id);
    };
  }

  render() {
    const threads = this.state.threads.map(
      ({ id, title, dateCreated, poster }) => {
        return (
          <tr
            className="highlight"
            onClick={this.displayMessages(id)}
            key={id.toString()}
          >
            <td>{id}</td>
            <td>{dateCreated}</td>
            <td>{poster}</td>
            <td>{title}</td>
          </tr>
        );
      }
    );

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
        <ThreadForm
          loggedIn={this.props.loggedIn}
          createThread={this.createThread.bind(this)}
        />
      </div>
    );
  }
}

class ThreadForm extends Component {
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

export default Threads;
