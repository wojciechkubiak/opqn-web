import React from "react";
import "../App.scss";
import RegisterPatron from "./../components/Forms/RegisterPatron";
import RegisterProtege from "./../components/Forms/RegisterProtege";

interface Props {
  mode: string;
  hide(): void;
  regSuccess(): void;
}

const Register = (props: Props) => (
    <div className="register">
      {props.mode === "patron" && (
        <RegisterPatron hide={props.hide} regSuccess={props.regSuccess}/>
      )}
      {props.mode === "protege" && (
        <RegisterProtege hide={props.hide} regSuccess={props.regSuccess}/>
      )}
    </div>
);

export default Register;
