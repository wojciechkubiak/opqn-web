import React, {useEffect, useState} from "react";
import 'core-js';

interface Props {
  userID: string
}

const Protege = (props: Props) => {
  const [examDateData, setExamDateData] = useState<any>([]);
  const token = localStorage.getItem("token");
  const [examDate, setExamDate] = useState("");
  const [equalDate, setEqualDate] = useState(false);

  const getData = () => {
    console.log("Getting data");
    fetch(`https://opqn-api.herokuapp.com/last-exam-date`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${token}`
      }
    })
    .then(res => res.json())
    .then(res => setExamDateData(res))
    .catch(error => error);
  }

  useEffect(() => {
    getData();
  }, [equalDate]);

  useEffect(() => {
    if(examDateData) {
      examDateData.map(element => {
        setExamDate(element.date);
      })
    }

    if(examDate) {
      const sameDate = compareDates(examDate);
      sameDate === 0 ? setEqualDate(true) : setEqualDate(false);
    }
  }, [examDateData, examDate, equalDate])

  const compareDates = (date : string) => {
    const _date = new Date();
    const exam = new Date(date);

    const res = splitDate(_date);
    const _res = splitDate(exam);

    console.log(res, _res);
    return res.localeCompare(_res);
  }

  const splitDate = (date : Date) => {
    const d = date.getDate();
    const m = date.getMonth() + 1;
    const y = date.getFullYear();

    return `${d}/${m}/${y}`;
  }

  return (
    <h1>Protege {props.userID} {examDate} {equalDate.toString()}</h1>
  );
};

export default Protege;
