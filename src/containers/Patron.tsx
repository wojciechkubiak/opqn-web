import React, { useEffect, useRef, useState } from "react";
import SignProtege from "./../components/Forms/SignProtege";
import { Button, Spinner } from "react-bootstrap";
import { IoMdPersonAdd } from "react-icons/io";
import Card from "./../components/Cards/Card";
import { gsap } from "gsap";
import "core-js";

import Logout from "../components/Button/Logout";

interface Props {
  userID: string,
  logOut(): void;
}

const Patron = (props: Props) => {
  let containerRef = useRef<HTMLDivElement>(null);
  const [proteges, setProteges] = useState<any>([]);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [arrayCreated, setArrayCreated] = useState<boolean>(false);
  const [showSignin, setShowSignin] = useState(false);
  const token = localStorage.getItem("token");
  let protegesData = useRef<any>(null);

  const getData = () => {
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
      }, 500)
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
  }, [loaded]);

  useEffect(() => {
    if(proteges[0]) {
      let _proteges = proteges[0];
      _proteges = _proteges[Object.keys(_proteges)[1]];
      protegesData.current = [..._proteges];
      if(loaded) {
        setArrayCreated(true);
      }
    }
  }, [loaded]);

  const showSigninHandler = () => setShowSignin(true);
  const hideSigninHandler = () => setShowSignin(false);

  return (
    <div className="patron">
      {!loaded && (
          <Button variant="primary" disabled>
            <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
            />
            Wczytywanie danych...
          </Button>
      )}
      {
        loaded && arrayCreated && (
            <>
              <Logout logOut={props.logOut}/>
              <div className="container" ref={containerRef}>
                <div className="patron--cards" style={{width: "100%", left: "0%", position: "relative", display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
                  {
                    protegesData.current.map(element => (
                        <Card firstname={element.firstname} loadedHandler={setLoaded} lastname={element.lastname} mail={element.mail} phone={element.phone} id={element.id}/>
                    ))
                  }
                </div>
              </div>
            </>
        )
      }
      {!showSignin && (
          <Button variant="success" className="patron--sign-protege-btn" style={{position: "fixed", right: "48px", bottom: "48px", width: "72px", height: "72px", borderRadius: "50%"}} onClick={showSigninHandler}><IoMdPersonAdd size={32}/></Button>
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
