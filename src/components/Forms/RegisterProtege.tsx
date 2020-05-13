import React, { useState, useMemo, useEffect, MouseEvent } from "react";
import { Button, Form, Spinner, InputGroup, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import DatePicker, {registerLocale} from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import pl from "date-fns/locale/pl";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'


registerLocale("pl", pl);


interface Props {
  hide(): void;
  regSuccess(): void;
}

const RegisterProtege = (props: Props) => {
  const [register, setRegister] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  // TODO: Fix date at database (01/01/2000 => 31/12/1999)
  const [birthday, setBirthday] = useState<Date | null>(new Date(2000, 0, 1));
  const [phone, setPhone] = useState("");
  const history = useHistory();

  const registerHandler = (event: React.FormEvent): void => {
    event.preventDefault();
    setRegister(true);

    console.log(data);
    fetch(`https://opqn-api.herokuapp.com/register-protege`, {
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
      birthday: birthday,
      phone: `${phone}`
    }),
    [firstname, lastname, mail, password, birthday, phone]
  );

  return (
    <Form className="login--form" onSubmit={registerHandler}>
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
          placeholder="Imię"
          onChange={(event) => setFirstname(event.target.value)}
          required
        />
      </Form.Group>
      <Form.Group className="login--form-group">
        <Form.Label className="login--form-label">Nazwisko</Form.Label>
        <Form.Control
          className="login--form-ctrl"
          type="text"
          placeholder="Nazwisko"
          onChange={(event) => setLastname(event.target.value)}
          required
        />
      </Form.Group>
      <Form.Group className="login--form-group">
        <Form.Label className="login--form-label">Email</Form.Label>
        <Form.Control
          className="login--form-ctrl"
          type="email"
          placeholder="Email"
          onChange={(event) => setMail(event.target.value)}
          required
        />
      </Form.Group>
      <Form.Group className="login--form-group">
        <Form.Label className="login--form-label">Hasło</Form.Label>
        <Form.Control
          className="login--form-ctrl"
          type="password"
          placeholder="Hasło"
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </Form.Group>
      <Form.Group className="login--form-group" controlId="validationCustomUsername">
          <Form.Label className="login--form-label">Numer telefonu</Form.Label>
          <PhoneInput
            placeholder="Wpisz numer"
            value={phone}
            onChange={setPhone}/>
        </Form.Group>
        <Form.Group className="login--form-group">
          <Form.Label className="login--form-label">Data zakupu</Form.Label>
          <DatePicker
            className="login--form-datepicker"
            locale="pl"
            selected={birthday}
            onChange={(date) => setBirthday(date)}
          />
        </Form.Group>
      {!register && (
        <Button
          className="login--form-btn"
          variant="success"
          size="lg"
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


export default RegisterProtege;