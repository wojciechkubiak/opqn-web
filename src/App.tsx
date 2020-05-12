import React, {useState} from 'react';
import { useHistory, BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import Login from './containers/Login';
import './App.css';

const App: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const history = useHistory();
  const log = localStorage.getItem("token") ? true : false;

  const routeToMainSite = () => history.push('/');


  return (
    <div className="App">
      {
      !loggedIn && (
        <Login/>
      )
    }
      <Route path="/login">
        <Login/>
      </Route>
    </div>
  );
}

export default App;
