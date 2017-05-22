import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

import { baseURL } from './config.json';

class Threads extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    fetch(`${baseURL}/threads.php`)
      .then(response => response.json())
      .then(json => {
        this.setState({
          data: json
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const data = this.state.data.map(
      ({ date_created: date, id, original_poster: poster, title }) => {
        return (
          <tr key={id.toString()}>
            <td>{id}</td>
            <td>{date}</td>
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
          {data}
        </tbody>
      </Table>
    );
  }
}

export default Threads;
