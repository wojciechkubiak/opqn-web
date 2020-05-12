import React, { useState, useMemo, MouseEvent } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import BootstrapSwitchButton from "bootstrap-switch-button-react";

import "../App.css";

const Login: React.FC = () => {
  const [logIn, setLogIn] = useState(false);
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState(false);

  const login = (event: MouseEvent): void => {
    event.preventDefault();
    setLogIn(true);
    let urlPart = mode ? "protege" : "patron";
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
        } else {
          alert("Wprowadzono błędne dane. Spróbuj ponownie.");
          setLogIn(false);
        }
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };

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
          checked={mode}
          size="lg"
          onlabel="PODOPIECZNY"
          offlabel="OPIEKUN"
          onstyle="success"
          width={200} 
          onChange={(checked: boolean) => {
            setMode(checked);
          }}
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
          <strong className="login--signin">Stwórz</strong>
        </span>
      </p>
    </div>
  );
};

export default Login;
