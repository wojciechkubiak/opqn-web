import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface Props {
  userID: string
}

const Patron = (props: Props) => {
  let containerRef = useRef<HTMLDivElement>(null);
  const [userID, setUserID] = useState("");
  const [proteges, setProteges] = useState<any>([]);
  const [loaded, setLoaded] = useState<boolean>(false);
  const token = localStorage.getItem("token");

  const getData = () => {
    console.log("Getting data");
    fetch(`https://opqn-api.herokuapp.com/patron-proteges`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => setProteges(res))
      .catch((error) => error);

      setTimeout(() => {
        setLoaded(true); 
      }, 2000)
  };

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
    const id = localStorage.getItem("id");
    if(id) {
      setUserID(id);
    }
    console.log(userID);
  })

  useEffect(() => {
    getData();

    console.log(proteges);
    proteges.forEach(element => {
     console.log(element)
    })
  }, [loaded]);

  return (
    <div className="patron">
      <div className="patron--container" ref={containerRef}>
        <h1>Patron {props.userID}</h1>
      </div>
    </div>
  );
};

export default Patron;
