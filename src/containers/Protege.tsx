import React, {useEffect, useRef, useState} from "react";
import {Spinner, Modal, Button} from "react-bootstrap";
import Exam from "./../components/Forms/Exam";

import 'core-js';

interface Props {
  userID: string
}

const Protege = (props: Props) => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [examDateData, setExamDateData] = useState<any>([]);
  const token = localStorage.getItem("token");
  const [examDate, setExamDate] = useState("");
  const [equalDate, setEqualDate] = useState(false);
  const [modalShownAtSession, setModalShownAtSession] = useState(false);
  
  const [modalShow, setModalShow] = useState(true);

  const hideModal = () => {
    setModalShow(false);
    sessionStorage.setItem("modal", "true");
  }

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
    const isShown = sessionStorage.getItem("modal");
    if(isShown) {
      setModalShownAtSession(true);
    }
  })

  useEffect(() => {
    getData();
  }, [equalDate, loaded]);

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
            <div className="patron--container">
              {
                !equalDate && (
                        <Exam loadedHandler={setLoaded}/>
                      )
              }
              {
                equalDate && (
                    <div className="exam--send-info">
                      <div style={{width: "100%", height: "20em", position: "relative"}}>
                        <h3 style={{color: "white", fontSize: "48px", textAlign: "center", position: "absolute", left: "50%", top: "50%", fontWeight: "bold", transform: "translate(-50%, -50%)"}}>TO JUŻ WSZYSTKO NA DZISIAJ.<br/>WRÓĆ JUTRO!</h3>
                      </div>
                    </div>
                )
              }
            </div>
        )}
        {!loaded && (
            <Button
            variant="success"
            style={{
              position: "relative",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              borderRadius: "0"
            }}
            disabled
          >
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            Loading...
          </Button>
        )}
        {!modalShownAtSession && (
            <Modal
                show={modalShow}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
              <Modal.Header style={{backgroundColor: "#292930", borderRadius: "0"}}>
                <Modal.Title id="contained-modal-title-vcenter" style={{color: "rgba(255, 255, 255, 0.8)"}}>
                  Informacja
                </Modal.Title>
              </Modal.Header>
              <Modal.Body style={{borderRadius: "0"}}>
                <p style={{color: "rgba(0,0,0,0.67)"}}>
                  Upewnij się, że wszystkie wprowadzone dane są zgodne ze stanem faktycznym.<br/>
                  Pamiętaj również, aby nie manipulować otrzymanymi danymi. Twoje liczby nikogo nie zszokują.
                </p>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" style={{borderRadius: "0"}} onClick={hideModal}>Wyjdź</Button>
                <Button variant="success" style={{borderRadius: "0"}} onClick={hideModal}>Rozumiem</Button>
              </Modal.Footer>
            </Modal>
        )}
      </div>
  );
};

export default Protege;
