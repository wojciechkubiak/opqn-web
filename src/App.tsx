import React, { useState, useEffect } from "react";
import {
  useHistory,
  BrowserRouter as Router,
  Route,
  NavLink,
} from "react-router-dom";
import Login from "./containers/Login";
import Register from "./containers/Register";
import Patron from "./containers/Patron";
import Protege from "./containers/Protege";

import "./App.scss";

const App: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [mode, setMode] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [regMode, setRegMode] = useState("");
  const [logMode, setLogMode] = useState(false);
  const [showPatron, setShowPatron] = useState(false);
  const [showProtege, setShowProtege] = useState(false);
  const localMode = localStorage.getItem("mode");

  const history = useHistory();
  const log = localStorage.getItem("token") ? true : false;
  const routeToMainSite = () => history.push("/");

  const modeHandler = () => {
    setMode(!mode);
  };

  useEffect(() => {
    setLoggedIn(log);

    let localMode = localStorage.getItem("mode");

    if (localMode === "patron" && loggedIn) {
      setShowPatron(true);
    } else if (localMode === "protege" && loggedIn) {
      setShowProtege(true);
    } else {
      setShowPatron(false);
      setShowProtege(false);
    }

    console.log(showPatron, showProtege)
  }, [log, loggedIn, showPatron, showProtege]);

  const regShowHandler = (reg: string) => {
    setShowRegister(!showRegister);
    setRegMode(reg);
  };

  const regSuccessHandler = () => {
    setShowRegister(false);
    setMode(false);
    setLoggedIn(false);
  };

  const regHideHandler = () => {
    setShowRegister(false);
    setLoggedIn(false);
  };

  const logHandler = () => {
    setLoggedIn(true);
  };

  return (
    <div className="App">
      {!loggedIn && (
        <Login
          mode={mode}
          reg={regShowHandler}
          handler={modeHandler}
          logHandler={logHandler}
        />
      )}
      {showRegister && (
        <Register
          mode={regMode}
          hide={regHideHandler}
          regSuccess={regSuccessHandler}
        />
      )}
      {showPatron && <Patron />}

      {showProtege && <Protege />}
    </div>
  );
};

export default App;
