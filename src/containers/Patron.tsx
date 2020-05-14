import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface Props {
  userID: string
}

const Patron = (props: Props) => {
  let containerRef = useRef<HTMLDivElement>(null);
  const [userID, setUserID] = useState("");
  
  useEffect(() => {
    gsap.fromTo(
      containerRef.current,
      {
        duration: 2,
        y: -1000,
      },
      {
        duration: 2,
        y: 0,
      }
    );
  }, []);

  useEffect(() => {
    const id = sessionStorage.getItem("id");
    if(id) {
      setUserID(id);
    }
    console.log(userID);
  })

  return (
    <div className="patron">
      <div className="patron--container" ref={containerRef}>
        <h1>Patron {props.userID}</h1>
      </div>
    </div>
  );
};

export default Patron;
