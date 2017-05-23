import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

import { baseURL } from './config.json';
import './Threads.css';

class Threads extends Component {
  constructor() {
    super();
    this.state = {
      threads: []
    };
  }

  componentDidMount() {
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

  onClick(id) {
    return () => {
      this.props.clickHandler(id);
    };
  }

  render() {
    const threads = this.state.threads.map(
      ({ id, title, dateCreated, poster }) => {
        return (
          <tr
            className="highlight"
            onClick={this.onClick(id)}
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
    );
  }
}

export default Threads;
