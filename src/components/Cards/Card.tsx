import React, {useEffect, useState} from "react";
import {Card as RbCard} from "react-bootstrap";
import {AiFillPhone, AiFillMail} from "react-icons/ai";

interface Props {
    firstname: string,
    lastname: string,
    date: string,
    weight: string,
    glucose: string,
    pressure: string,
    phone: string,
    mail: string
}

const Card = (props: Props) => {
    return (
        <RbCard className="patron--card" style={{ margin: "2%", width: "46%", backgroundColor: "#ffffff", border: "none", color: "rgba(0, 0, 0, 0.8)"}}>
            <RbCard.Body>
                <button style={{border: "none", backgroundColor: "transparent", position: "absolute", right: "2px", top: "2px", color: "rgba(0, 0, 0, 0.6)"}}>X</button>
                <RbCard.Title style={{textAlign: "center"}}>{props.firstname} {props.lastname}</RbCard.Title>
                <RbCard.Subtitle className="mb-2 text-muted" style={{textAlign: "center", marginBottom: "10px"}}>{props.date}</RbCard.Subtitle>
                <RbCard.Text>
                   Waga: {props.weight}
                </RbCard.Text>
                <RbCard.Text>
                    Glukoza: {props.glucose}
                </RbCard.Text>
                <RbCard.Text>
                    Ciśnienie: {props.pressure}
                </RbCard.Text>
                <RbCard.Text style={{textAlign: "right"}}>
                    <AiFillPhone/> {props.phone}
                </RbCard.Text>
                <RbCard.Text style={{textAlign: "right"}}>
                    <AiFillMail/> {props.mail}
                </RbCard.Text>
            </RbCard.Body>
        </RbCard>
    )
}

export default Card;