import React, { Component } from 'react';
import {
  Button,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
  Grid
} from 'react-bootstrap';

class LoginForm extends Component {
  render() {
    return (
      <Form inline>
        <FormGroup controlId="formInlineLogin">
          <FormControl type="text" placeholder="Имя пользователя" />
          {' '}
          <FormControl type="password" placeholder="Пароль" />
        </FormGroup>
        {' '}
        <Button type="submit">
          Войти
        </Button>
      </Form>
    );
  }
}

class RegistrationForm extends Component {
  render() {
    return (
      <Form>
        <FormGroup controlId="formInlineRegister">
          <FormControl type="text" placeholder="Имя пользователя" />
          <FormControl type="password" placeholder="Пароль" />
          <FormControl type="email" placeholder="Почта" />
        </FormGroup>
        <Button type="submit">
          Зарегистрироваться
        </Button>
      </Form>
    );
  }
}

export { LoginForm, RegistrationForm };
