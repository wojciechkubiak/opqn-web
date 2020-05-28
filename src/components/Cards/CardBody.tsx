import React, { useEffect, useState } from "react";
import {Button, Card as RbCard, Modal} from "react-bootstrap";
import {AiFillPhone, AiFillMail} from "react-icons/ai";

interface Props {
    firstname: string,
    lastname: string,
    phone: string,
    mail: string,
    id: string,
    loadedHandler(loaded: boolean): void
}

const CardBody = (props: Props) => {
    const [data, setData] = useState<any>([]);
    const [loaded, setLoaded] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showCardBody, setShowCardBody] = useState<boolean>(true);

    const hideModalHandler = () : void => {
        setShowModal(false);
        setShowCardBody(true);
    };

    const showModalHandler = () : void => {
        setShowModal(true);
        setShowCardBody(false);
    };

    const token = localStorage.getItem("token");

    const getData = () => {
        fetch(`https://opqn-api.herokuapp.com/last-protege-exam/${props.id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `${token}`,
            },
        })
            .then((res) => res.json())
            .then((res) => {
                setData(res)
            })
            .catch((error) => error);

        setTimeout(() => {
            props.loadedHandler(true);
            setLoaded(true);
        }, 1500)
    };

    const removeFromGroup = (): void => {
        setLoaded(false);

        fetch(`https://opqn-api.herokuapp.com/delete-protege/${props.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `${token}`,
            }
        })
            .then((response) => response.json())
            .catch((error) => {
                console.error("Error", error);
            });

        hideModalHandler();

        setTimeout(() => {
            props.loadedHandler(false);
            setLoaded(false);
        }, 500)
    }

    useEffect(() => {
        getData();
    }, [loaded]);

    return (
        <>
            <RbCard.Body>
                {!showModal && (
                    <button onClick={showModalHandler} style={{border: "none", backgroundColor: "transparent", position: "absolute", right: "2px", top: "2px", color: "rgba(0, 0, 0, 0.6)"}}>X</button>
                )}
                <RbCard.Title style={{textAlign: "center"}}>{props.firstname} {props.lastname}</RbCard.Title>
                {loaded && showCardBody && (
                    data.map(data => (
                        <>
                            <RbCard.Subtitle className="mb-2 text-muted" style={{textAlign: "center", marginBottom: "10px"}}>
                                { (data.date).substring(0, 10) }
                            </RbCard.Subtitle>
                            <RbCard.Text>
                                Waga: {data.weight}
                            </RbCard.Text>
                            <RbCard.Text>
                                Glukoza: {data.glucose}
                            </RbCard.Text>
                            <RbCard.Text>
                                Ciśnienie: {data.pressure}
                            </RbCard.Text>
                        </>
                    ))
                )}
                {showModal && (
                    <Modal.Dialog style={{position: "relative", width: "100%", margin: "0", padding: "0", textAlign: "center"}}>
                        <Modal.Header>
                            <Modal.Title>Wypisz podopiecznego</Modal.Title>
                        </Modal.Header>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={hideModalHandler}>Anuluj</Button>
                            <Button variant="danger" onClick={removeFromGroup}>Potwierdź</Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                )}
                {showCardBody && (
                   <>
                       <RbCard.Text style={{textAlign: "right"}}>
                           <AiFillPhone/> {props.phone}
                       </RbCard.Text>
                       <RbCard.Text style={{textAlign: "right"}}>
                           <AiFillMail/> {props.mail}
                       </RbCard.Text>
                   </>
                )}
            </RbCard.Body>

        </>
    )
}

export default CardBody;