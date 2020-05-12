import React, { useState, useMemo, useEffect, MouseEvent } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import BootstrapSwitchButton from "bootstrap-switch-button-react";

import "../App.css";

interface Props {
    mode: boolean,
    handler(): void,
    logHandler(): void;
}

const Login = (props: Props) => {
  const [logIn, setLogIn] = useState(false);
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  let urlPart = props.mode ? "protege" : "patron";

  const login = (event: MouseEvent): void => {
    event.preventDefault();
    setLogIn(true);
    
    console.log(urlPart);
    fetch(`https://opqn-api.herokuapp.com/login-${urlPart}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          setLogIn(false);
          props.logHandler();
        } else {
          alert("Wprowadzono błędne dane. Spróbuj ponownie.");
          setLogIn(false);
        }
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };

  useEffect(() => {
      console.log(props.mode);
      console.log(urlPart);
  }, [props.mode])

  const data = useMemo(
    (): object => ({
      mail: mail,
      password: password,
    }),
    [mail, password]
  );

  return (
    <div className="login">
      <h1 className="login--header">ZALOGUJ</h1>
      <Form className="login--form">
        <Form.Group className="login--form-switch">
        <BootstrapSwitchButton
          checked={props.mode}
          size="lg"
          onlabel="PODOPIECZNY"
          offlabel="OPIEKUN"
          onstyle="success"
          width={200} 
          onChange={() => props.handler()
          }
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
        {!logIn && (
          <Button
            className="login--form-btn"
            variant="success"
            size="lg"
            onClick={login}
            type="submit"
          >
            ZALOGUJ
          </Button>
        )}
        {logIn && (
          <Button variant="success" className="login--form-btn" disabled>
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            Logowanie...
          </Button>
        )}
      </Form>
      <p className="login--paragraph">
        Nie masz jeszcze konta?{" "}
        <span>
          <Button variant="success" className="login--signin">Stwórz</Button>
        </span>
      </p>
    </div>
  );
};

export default Login;
