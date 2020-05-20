import React, { useState, useMemo, useEffect, useRef, MouseEvent } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import { AiOutlineFork, AiOutlineForm } from "react-icons/ai";
import { gsap } from "gsap";

import "../App.scss";

interface Props {
  mode: boolean;
  handler(): void;
  logHandler(): void;
  reg(reg: string): void;
  userHandler(id: string): void;
}

const Login = (props: Props) => {
  let optionsRef = useRef<HTMLDivElement>(null);
  const [logIn, setLogIn] = useState(false);
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  
  let urlPart: string = props.mode ? "protege" : "patron";

  const showOptionsHandler = () => {
    setShowOptions(!showOptions);
  };

  const login = (event: MouseEvent): void => {
    event.preventDefault();
    setLogIn(true);
    const logDate = new Date();

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
          props.userHandler(data.id);
          props.mode ? localStorage.setItem("mode", "protege") : localStorage.setItem("mode", "patron");
          localStorage.setItem("logDate", logDate.toISOString())
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
  }, [props.mode]);


  useEffect(() => {
    gsap.fromTo(
      optionsRef.current, {
          display: "none",
          duration: 1,
          opacity: 0,
          y: -175
      }, {
          display: "block",
          duration: 1,
          opacity: 1,
          y: -100
      }
    )
  }, [showOptions])

  const hideOptions = () => {
    gsap.to(
      optionsRef.current, {
          duration: .2,
          opacity: 0,
          onComplete: () => {
            showOptionsHandler()
          }
      }
    )
    
  }
  const data = useMemo(
    (): object => ({
      mail: mail,
      password: password,
    }),
    [mail, password]
  );

  return (
    <div className="login">
      {!showOptions && (
        <>
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
                onChange={() => props.handler()}
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
        </>
      )}
      {showOptions && (
        <>
          <h1 className="login--header">TYP KONTA</h1>
          <div className="options" ref={optionsRef} style={{display: "none"}}>
            <Button
              className="options--btn-back"
              variant="danger"
              onClick={hideOptions}
            >
              X
            </Button>
            <figure className="options--figure" onClick={() => props.reg("patron")}>
              <div className="options--icon">
                <AiOutlineFork className="options--svg" size={128} />
              </div>
              <figcaption className="options--figcaption">Opiekun</figcaption>
            </figure>
            <figure className="options--figure" onClick={() => props.reg("protege")}>
              <div className="options--icon">
                <AiOutlineForm className="options--svg" size={128} />
              </div>
              <figcaption className="options--figcaption">
                Podopieczny
              </figcaption>
            </figure>
          </div>
        </>
      )}
      <p className="login--paragraph">
        Nie masz jeszcze konta?{" "}
        <span>
          <Button
            variant="success"
            onClick={showOptionsHandler}
            className="signin-btn"
            disabled={showOptions}
          >
            Stwórz
          </Button>
        </span>
      </p>
    </div>
  );
};

export default Login;
