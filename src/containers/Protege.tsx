import React, {useEffect, useState} from "react";

interface Props {
  userID: string
}

const Protege = (props: Props) => {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");

  const getData = () => {
    const id = localStorage.getItem("id");
    fetch(`https://opqn-api.herokuapp.com/exams/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${token}`
      }
    })
    .then(res => res.json())
    .then(res => setData(res))
    .catch(error => error);
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <h1>Protege {props.userID}</h1>
  );
};

export default Protege;
