import React, { useEffect, useRef, useState } from "react";
import SignProtege from "./../components/Forms/SignProtege";
import { Button } from "react-bootstrap";
import { IoMdPersonAdd } from "react-icons/io";
import { gsap } from "gsap";

interface Props {
  userID: string
}

const Patron = (props: Props) => {
  let containerRef = useRef<HTMLDivElement>(null);
  const [proteges, setProteges] = useState<any>([]);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [showSignin, setShowSignin] = useState(false);
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
    getData();

    console.log(proteges);
    proteges.forEach(element => {
     console.log(element)
    })
  }, [loaded]);

  const showSigninHandler = () => setShowSignin(true);
  const hideSigninHandler = () => setShowSignin(false);

  return (
    <div className="protege">
      <div className="patron--container" ref={containerRef}>
        <h1>Patron {props.userID}</h1>
      </div>
      {!showSignin && (
          <Button variant="success" style={{position: "fixed", right: "calc(10% - 36px)", bottom: "48px", width: "72px", height: "72px", borderRadius: "50%"}} onClick={showSigninHandler}><IoMdPersonAdd size={32}/></Button>
      )}
      {
        showSignin && (
            <SignProtege hide={hideSigninHandler}/>
        )
      }
    </div>
  );
};

export default Patron;
