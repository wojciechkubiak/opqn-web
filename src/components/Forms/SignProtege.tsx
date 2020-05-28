import React, { useState, useMemo} from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

interface Props {
    hide(): void,
    loadedHandler(loaded: boolean): void
}

const RegisterProtege = (props: Props) => {

    const [signin, setSignin] = useState(false);
    const [phone, setPhone] = useState("");

    const signinHandler = (event: React.FormEvent): void => {
        event.preventDefault();
        setSignin(true);
        const token = localStorage.getItem("token");

        fetch(`https://opqn-api.herokuapp.com/sign-protege`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `${token}`,
            },
            body: JSON.stringify(data),
        })
        .then((response) => response.json())
        .then((data) => {
            if(data.status[0]) {
                console.log("Success")
                props.hide();

                setTimeout(() => {
                    props.loadedHandler(false);
                }, 500)
            } else {
                alert("Użytkownik lub przypisany, bądź wprowadzono zły numer telefonu");
                setSignin(false);
            }
        })
        .catch((error) => {
            alert("Błędny numer telefonu");
            setSignin(false);
            console.error("Error", error);
        });
    };

    const data = useMemo(
        (): object => ({
            phone: `${phone}`,
        }),
        [phone]
    );

    return (
        <Form
            className="login--form"
            onSubmit={signinHandler}
        >
            <Button className="options--btn-back" variant="danger" onClick={props.hide}>
                X
            </Button>

            <Form.Group
                className="login--form-group"
                controlId="validationCustomUsername"
            >
                <Form.Label className="login--form-label">Numer telefonu</Form.Label>
                <PhoneInput
                    placeholder="Wpisz numer"
                    value={phone}
                    onChange={setPhone}
                />
            </Form.Group>
            {!signin && (
                <Button
                    className="login--form-btn"
                    variant="success"
                    size="lg"
                    type="submit"
                >
                    DODAJ
                </Button>
            )}
            {signin && (
                <Button variant="success" className="login--form-btn" disabled>
                    <Spinner
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    />
                    PRÓBA DODANIA...
                </Button>
            )}
        </Form>
    );
};

export default RegisterProtege;
