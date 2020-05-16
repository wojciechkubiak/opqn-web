import React, {MouseEvent, useMemo, useState} from "react";
import {Button, Form, Spinner, Modal, Row, Col} from "react-bootstrap";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import pl from "date-fns/locale/pl";
registerLocale("pl", pl);

const Exam = () => {
    const [weight, setWeight] = useState<string>("");
    const [glucose, setGlucose] = useState<string>("");
    const [firstPressure, setFirstPressure] = useState<string>("");
    const [secondPressure, setSecondPressure] = useState<string>("");
    const [examDate, setExamDate] = useState<Date | null>(new Date());

    const data = useMemo(
        (): object => ({
            weight: weight.toString(),
            glucose: glucose.toString(),
            pressure: `${firstPressure}/${secondPressure}`,
            date: examDate
        }),
        [weight, glucose, firstPressure, secondPressure, examDate]
    );

    const postHandler = (event: React.FormEvent) : void => {
        event.preventDefault();
        const token = localStorage.getItem("token");

        fetch("https://opqn-api.herokuapp.com/add-exam", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${token}`
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Success:", data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    return (
        <Form
            className="login--form"
        >
            <Form.Group className="login--form-group">
                <Form.Label className="login--form-label">Waga</Form.Label>
                <Form.Control
                    className="login--form-ctrl"
                    type="number"
                    placeholder="Wpisz aktualną wagę"
                    required
                    onChange={(event) => setWeight(event.target.value)}
                />
            </Form.Group>
            <Form.Group className="login--form-group">
                <Form.Label className="login--form-label">Glukoza</Form.Label>
                <Form.Control
                    className="login--form-ctrl"
                    type="number"
                    placeholder="Wpisz poziom glukozy"
                    required
                    onChange={(event) => setGlucose(event.target.value)}
                />
            </Form.Group>
            <Form.Group className="login--form-group">
                <Form.Label className="login--form-label">Ciśnienie</Form.Label>
                <Row>
                    <Col>
                        <Form.Control
                            className="login--form-ctrl"
                            type="number"
                            placeholder="Wpisz tętnicze"
                            required
                            onChange={(event) => setFirstPressure(event.target.value)}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Control
                            className="login--form-ctrl"
                            type="number"
                            placeholder="Ciśnienie skurczowe"
                            required
                            onChange={(event) => setSecondPressure(event.target.value)}
                        />
                    </Col>
                </Row>
            </Form.Group>
            <Form.Group className="login--form-group">
                <Form.Label className="login--form-label">Data badania</Form.Label>
                <DatePicker
                    className="login--form-datepicker"
                    locale="pl"
                    selected={examDate}
                    onChange={(date) => setExamDate(date)}
                />
            </Form.Group>
            <Button
                className="login--form-btn"
                variant="success"
                size="lg"
                onClick={postHandler}
                type="submit"
            >
                DODAJ
            </Button>
        </Form>
    )
}

export default Exam;