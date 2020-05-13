import React, { useState, useMemo, useRef, useEffect, MouseEvent } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { gsap } from "gsap";

interface Props {
  hide(): void;
  regSuccess(): void;
}

const RegisterPatron = (props: Props) => {
  let patronFormRef = useRef<HTMLFormElement>(null);

  const [register, setRegister] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  useEffect(() => {
    gsap.fromTo(
      patronFormRef.current,
      {
        display: "none",
        duration: 2,
        y: -1000,
      },
      {
        display: "block",
        duration: 2,
        y: -300,
      }
    );
  }, []);

  const registerHandler = (event: MouseEvent): void => {
    event.preventDefault();
    setRegister(true);

    console.log(data);
    fetch(`https://opqn-api.herokuapp.com/register-patron`, {
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
        alert("Podany adres email jest już zajęty");
        setRegister(false);
        console.error("Error", error);
      });
  };

  const data = useMemo(
    (): object => ({
      firstname: firstname.charAt(0).toUpperCase() + firstname.slice(1),
      lastname: lastname.charAt(0).toUpperCase() + lastname.slice(1),
      mail: mail,
      password: password,
    }),
    [firstname, lastname, mail, password]
  );

  return (
    <Form
      className="login--form"
      ref={patronFormRef}
      style={{ display: "none" }}
    >
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
  );
};

export default RegisterPatron;
