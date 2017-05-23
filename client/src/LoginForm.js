import React, { Component } from 'react';
import { Button, Form, FormControl, FormGroup } from 'react-bootstrap';

class LoginForm extends Component {
  render() {
    return (
      <Form inline onSubmit={this.props.clickHandler}>
        <FormGroup>
          <FormControl type="text" name="user" placeholder="Имя пользователя" />
          {' '}
          <FormControl type="password" name="pass" placeholder="Пароль" />
        </FormGroup>
        {' '}
        <Button type="submit">Войти</Button>
      </Form>
    );
  }
}

export default LoginForm;
