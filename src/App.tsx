import React, {useState} from 'react';
import { useHistory, BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import Login from './containers/Login';
import './App.css';


const App: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [mode, setMode] = useState(false);

  const history = useHistory();
  const log = localStorage.getItem("token") ? true : false;

  const routeToMainSite = () => history.push('/');

  const modeHandler = () => {
    setMode(!mode);
  }

  const logHandler = () => {
    setLoggedIn(true);
  }

  return (
    <div className="App">
      {
      !loggedIn && (
        <Login mode={mode} handler={modeHandler} logHandler={logHandler}/>
      )
    }
      <Route path="/login">
        <Login mode={mode} handler={modeHandler} logHandler={logHandler}/>
      </Route>
    </div>
  );
}

export default App;
