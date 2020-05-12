import React, { useState } from "react";
import {
  useHistory,
  BrowserRouter as Router,
  Route,
  NavLink,
} from "react-router-dom";
import Login from "./containers/Login";
import Register from "./containers/Register";
import "./App.scss";

const App: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [mode, setMode] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [regMode, setRegMode] = useState("");

  const history = useHistory();
  const log = localStorage.getItem("token") ? true : false;

  const routeToMainSite = () => history.push("/");

  const modeHandler = () => {
    setMode(!mode);
  };

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
      {showRegister && <Register mode={regMode} hide={regHideHandler} regSuccess={regSuccessHandler}/>}
      {/* <Route path="/">
        <Login
          mode={mode}
          reg={regShowHandler}
          handler={modeHandler}
          logHandler={logHandler}
        />
      </Route> */}
    </div>
  );
};

export default App;
