import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

import './Threads.css';

class Threads extends Component {
  render() {
    const threads = this.props.threads.map(
      ({ id, title, dateCreated, poster }) => {
        return (
          <tr
            className="highlight"
            onClick={this.props.clickHandler}
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
