import React, {useEffect, useRef, useState} from "react";
import {Spinner} from "react-bootstrap";
import Exam from "./../components/Forms/Exam";

import 'core-js';
import { gsap } from "gsap";
import {equal} from "assert";

interface Props {
  userID: string
}

const Protege = (props: Props) => {
  let containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState<boolean>(false);
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
      setLoaded(true);
    }


  }, [examDateData, examDate, equalDate])

  useEffect(() => {
    if(loaded) {
      gsap.fromTo(
          containerRef.current,
          {
            duration: .5,
            display: "none",
            y: -200,
            opacity: 0
          },
          {
            duration: .5,
            display: "block",
            y: 0,
            opacity: 1
          }
      );
    }
  }, [loaded])
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
      <div className="patron">
        {loaded && (
            <div className="patron--container" style={{display: "none"}} ref={containerRef}>
              {
                !equalDate && (
                  <Exam/>
                )
              }
              {
                equalDate && (
                    <div className="exam--send-info">
                      <div style={{width: "100%", height: "20em", position: "relative"}}>
                        <h3 style={{color: "white", fontSize: "48px", position: "absolute", left: "50%", top: "50%", fontWeight: "bold", transform: "translate(-50%, -50%)"}}>WRÓĆ JUTRO</h3>
                      </div>
                    </div>
                )
              }
            </div>
        )}
        {!loaded && (
            <Spinner animation="border" variant="success" style={{position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}/>
        )}
      </div>
  );
};

export default Protege;
