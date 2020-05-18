import React, { MouseEvent, useMemo, useState, useEffect, useRef } from "react";
import { Button, Form, Spinner, Modal, Row, Col } from "react-bootstrap";
import DatePicker, { registerLocale } from "react-datepicker";
import { gsap } from "gsap";
import "react-datepicker/dist/react-datepicker.css";
import pl from "date-fns/locale/pl";
import { FiFilePlus } from "react-icons/fi";

registerLocale("pl", pl);

interface Props {
  loadedHandler(reg: boolean): void;
}

const Exam = (props: Props) => {
  const [weight, setWeight] = useState<string>("");
  const [glucose, setGlucose] = useState<string>("");
  const [firstPressure, setFirstPressure] = useState<string>("");
  const [secondPressure, setSecondPressure] = useState<string>("");
  const [examDate, setExamDate] = useState<Date | null>(new Date());
  const [showSpinner, setShowSpinner] = useState<boolean>(false);
  const [wrongWeight, setWrongWeight] = useState<Object>({});
  const [wrongGlucose, setWrongGlucose] = useState<Object>({});
  const [wrongFirstPressure, setWrongFirstPressure] = useState<Object>({});
  const [wrongSecondPressure, setWrongSecondPressure] = useState<Object>({});
  const [showWeightFig, setShowWeightFig] = useState<boolean>(false);
  const [showGlucoseFig, setShowGlucoseFig] = useState<boolean>(false);
  const [showFirstPressureFig, setShowFirstPressureFig] = useState<boolean>(
    false
  );
  const [showSecondPressureFig, setShowSecondPressureFig] = useState<boolean>(
    false
  );
  const [showForm, setShowForm] = useState(false);
  const [value, setValue] = useState(false);

  const showFormHandler = () => setValue(!value);

  let containerRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (value) {
      setShowForm(true);
      gsap.fromTo(
        containerRef.current,
        {
          duration: 0.5,
          display: "none",
          y: -200,
          opacity: 0,
        },
        {
          duration: 0.5,
          display: "block",
          y: 0,
          opacity: 1,
        }
      );
    } else {
      gsap.fromTo(
        containerRef.current,
        {
          duration: 0.5,
          display: "block",
          y: 0,
          opacity: 1,
        },
        {
          duration: 0.5,
          display: "none",
          y: -100,
          opacity: 0,
          onComplete: () => {
            setShowForm(false);
          },
        }
      );
    }
  }, [value]);

  const data = useMemo(
    (): object => ({
      weight: weight.toString(),
      glucose: glucose.toString(),
      pressure: `${firstPressure}/${secondPressure}`,
      date: examDate,
    }),
    [weight, glucose, firstPressure, secondPressure, examDate]
  );

  const postHandler = (event: React.FormEvent): void => {
    event.preventDefault();
    const token = localStorage.getItem("token");

    if (Number(weight) > 30 && Number(weight) < 450) {
      setWrongWeight({});
      setShowWeightFig(false);
      if (Number(glucose) > 85 && Number(glucose) < 145) {
        setWrongGlucose({});
        setShowGlucoseFig(false);
        if (Number(firstPressure) > 0 && Number(firstPressure) < 200) {
          setWrongFirstPressure({});
          setShowFirstPressureFig(false);
          if (Number(secondPressure) > 0 && Number(secondPressure) < 120) {
            setWrongSecondPressure({});
            setShowSecondPressureFig(false);

            fetch("https://opqn-api.herokuapp.com/add-exam", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `${token}`,
              },
              body: JSON.stringify(data),
            })
              .then((response) => response.json())
              .then((data) => {
                console.log("Success:", data);
              })
              .then(() => setShowSpinner(true))
              .catch((error) => {
                console.error("Error:", error);
              });

            setTimeout(() => {
              props.loadedHandler(false);
            }, 1000);
          } else {
            setWrongHandler(setWrongSecondPressure);
            setShowSecondPressureFig(true);
          }
        } else {
          setWrongHandler(setWrongFirstPressure);
          setShowFirstPressureFig(true);
        }
      } else {
        setWrongHandler(setWrongGlucose);
        setShowGlucoseFig(true);
      }
    } else {
      setWrongHandler(setWrongWeight);
      setShowWeightFig(true);
    }
  };

  const setWrongHandler = (func: Function) => {
    func({
      borderBottom: "3px solid #ff4444",
    });
  };

  return (
    <>
      {!showForm && (
        <Button
          variant="success"
          onClick={showFormHandler}
          style={{
            width: "auto",
            height: "auto",
            right: "48px",
            bottom: "48px",
            padding: "24px",
            position: "fixed",
            borderRadius: "50%",
          }}
        >
          <FiFilePlus size={32} />
        </Button>
      )}
      {showForm && (
        <Form className="exam--form" ref={containerRef}>
          <Button
            onClick={showFormHandler}
            style={{
              position: "absolute",
              right: "0",
              borderRadius: "0",
              backgroundColor: "#ffffff",
              color: "#a8a8a8",
              border: "none",
            }}
          >
            X
          </Button>
          <Form.Group className="exam--form-group">
            <h1
              style={{
                textAlign: "center",
                marginTop: "10px",
                marginBottom: "24px",
                color: "rgba(0, 0, 0, 0.67)",
              }}
            >
              Badanie
            </h1>
            <Row>
              <Col>
                <Form.Label className="exam--form-label">
                  Data badania
                </Form.Label>
                <DatePicker
                  className="exam--form-datepicker"
                  locale="pl"
                  selected={examDate}
                  onChange={(date) => setExamDate(date)}
                />
              </Col>
              <Col>
                <Form.Label className="exam--form-label">Waga</Form.Label>
                <figure>
                  <Form.Control
                    className="exam--form-ctrl"
                    style={wrongWeight}
                    type="number"
                    placeholder="Wpisz aktualną wagę"
                    required
                    onChange={(event) => {
                      setWeight(event.target.value);
                      setWrongWeight({});
                      setShowWeightFig(false);
                    }}
                  />
                  {showWeightFig && (
                    <figcaption
                      style={{ textAlign: "center", color: "#ff4444" }}
                    >
                      Błedne dane
                    </figcaption>
                  )}
                </figure>
              </Col>
              <Col>
                <Form.Label className="exam--form-label">Glukoza</Form.Label>
                <figure>
                  <Form.Control
                    className="exam--form-ctrl"
                    type="number"
                    style={wrongGlucose}
                    placeholder="Wpisz poziom glukozy"
                    required
                    onChange={(event) => {
                      setGlucose(event.target.value);
                      setWrongGlucose({});
                      setShowGlucoseFig(false);
                    }}
                  />
                  {showGlucoseFig && (
                    <figcaption
                      style={{ textAlign: "center", color: "#ff4444" }}
                    >
                      Błedne dane
                    </figcaption>
                  )}
                </figure>
              </Col>
            </Row>
          </Form.Group>
          <Form.Group className="exam--form-group">
            <Row>
              <Col>
                <Form.Label className="exam--form-label">
                  Ciśnienie tętnicze
                </Form.Label>
                <figure>
                  <Form.Control
                    className="exam--form-ctrl"
                    type="number"
                    style={wrongFirstPressure}
                    placeholder="Wpisz tętnicze"
                    required
                    onChange={(event) => {
                      setFirstPressure(event.target.value);
                      setWrongFirstPressure({});
                      setShowFirstPressureFig(false);
                    }}
                  />
                  {showFirstPressureFig && (
                    <figcaption
                      style={{ textAlign: "center", color: "#ff4444" }}
                    >
                      Błedne dane
                    </figcaption>
                  )}
                </figure>
              </Col>
              <Col>
                <Form.Label className="exam--form-label">
                  Ciśnienie skurczowe
                </Form.Label>
                <figure>
                  <Form.Control
                    className="exam--form-ctrl"
                    type="number"
                    style={wrongSecondPressure}
                    placeholder="Ciśnienie skurczowe"
                    required
                    onChange={(event) => {
                      setSecondPressure(event.target.value);
                      setWrongSecondPressure({});
                      setShowSecondPressureFig(false);
                    }}
                  />
                  {showSecondPressureFig && (
                    <figcaption
                      style={{ textAlign: "center", color: "#ff4444" }}
                    >
                      Błedne dane
                    </figcaption>
                  )}
                </figure>
              </Col>
            </Row>
          </Form.Group>

          {!showSpinner && (
            <Button
              className="exam--form-btn"
              variant="success"
              size="lg"
              onClick={postHandler}
              type="submit"
            >
              DODAJ
            </Button>
          )}
          {showSpinner && (
            <Button
              variant="success"
              style={{
                position: "relative",
                left: "50%",
                transform: "translate(-50%, 0%)",
                width: "100%",
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
        </Form>
      )}
    </>
  );
};

export default Exam;
