import React from "react";

interface Props {
  userID: string
}

const Protege = (props: Props) => {
  return <h1>Protege {props.userID}</h1>;
};

export default Protege;
