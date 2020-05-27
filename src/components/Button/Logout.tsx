import React from "react";
import {IoMdExit} from "react-icons/io";

interface Props {
    logOut(): void;
}

const Logout = (props: Props) => (
    <button
        style={{
            position: "relative",
            left: "50%",
            transform: "translate(-50%, 0%)",
            border: "none",
            backgroundColor: "transparent",
            color: "rgba(255, 255, 255, 0.67)",
            fontSize: "auto",
            textAlign: "center",
            marginBottom: ".5em"
        }}
        onClick={props.logOut}
    >
        Wyloguj
        <IoMdExit style={{ color: "rgba(255, 255, 255, .67)" }} size={32} />
    </button>
)

export default Logout;