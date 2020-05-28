import React from "react";
import {Card as RbCard} from "react-bootstrap";
import CardBody from "./CardBody";

interface Props {
    firstname: string,
    lastname: string,
    phone: string,
    mail: string,
    id: string,
    loadedHandler(loaded: boolean): void
}

const Card = (props: Props) => {

    return (
        <RbCard className="patron--card" style={{ margin: "2%", width: "46%", backgroundColor: "#ffffff", border: "none", color: "rgba(0, 0, 0, 0.8)"}}>
            <CardBody firstname={props.firstname} lastname={props.lastname} phone={props.phone} loadedHandler={props.loadedHandler} mail={props.mail} id={props.id}/>
        </RbCard>
    )
}

export default Card;