import React, { useState, useMemo, useEffect, MouseEvent } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import {
    useHistory,
  } from "react-router-dom";
import "../App.css";

interface Props {
  mode: string;
  hide(): void;
  regSuccess(): void;
}

const Register = (props: Props) => {
  const [register, setRegister] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const registerHandler = (event: MouseEvent): void => {
    event.preventDefault();
    setRegister(true);

    console.log(props.mode, data);

    fetch(`https://opqn-api.herokuapp.com/register-${props.mode}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success", data);
        props.regSuccess();
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };

  const data = useMemo(
    (): object => ({
      firstname: firstname,
      lastname: lastname,
      mail: mail,
      password: password,
    }),
    [firstname, lastname, mail, password]
  );

  const _data = useMemo(
    (): object => ({
      mail: mail,
      password: password,
    }),
    [mail, password]
  );

  return (
    <div className="register">
      {props.mode === "patron" && (
        <Form className="login--form">
          <Button
            className="options--btn-back"
            variant="danger"
            onClick={props.hide}
          >
            X
          </Button>
          <Form.Group className="login--form-group">
            <Form.Label className="login--form-label">Imię</Form.Label>
            <Form.Control
              className="login--form-ctrl"
              type="text"
              placeholder="Wpisz imię"
              onChange={(event) => setFirstname(event.target.value)}
            />
          </Form.Group>
          <Form.Group className="login--form-group">
            <Form.Label className="login--form-label">Nazwisko</Form.Label>
            <Form.Control
              className="login--form-ctrl"
              type="text"
              placeholder="Wpisz nazwisko"
              onChange={(event) => setLastname(event.target.value)}
            />
          </Form.Group>
          <Form.Group className="login--form-group">
            <Form.Label className="login--form-label">Email</Form.Label>
            <Form.Control
              className="login--form-ctrl"
              type="email"
              placeholder="Wpisz email"
              onChange={(event) => setMail(event.target.value)}
            />
          </Form.Group>
          <Form.Group className="login--form-group">
            <Form.Label className="login--form-label">Hasło</Form.Label>
            <Form.Control
              className="login--form-ctrl"
              type="password"
              placeholder="Wpisz hasło"
              onChange={(event) => setPassword(event.target.value)}
            />
          </Form.Group>
          {!register && (
            <Button
              className="login--form-btn"
              variant="success"
              size="lg"
              onClick={registerHandler}
              type="submit"
            >
              ZAREJESTRUJ
            </Button>
          )}
          {register && (
            <Button variant="success" className="login--form-btn" disabled>
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              Rejestracja...
            </Button>
          )}
        </Form>
      )}
    </div>
  );
};

export default Register;