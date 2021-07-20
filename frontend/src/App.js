import React,{useState} from "react";
import Nav from  "./Nav";
import Compose from "./Compose";
import {BrowserRouter as Router,Route} from "react-router-dom";
import {LoginContext} from './Contexts/LoginContext';
import Blog2 from './Blog2';
 
const App = () => {

  const [loggedIn,setLoggedIn] = useState(false);
  const [currentUser,setCurrentUser] = useState({})

  return (
    
    <Router>
    <LoginContext.Provider value={{loggedIn,setLoggedIn,currentUser,setCurrentUser}}>
    <Route path="/" exact component={Nav} />
    <Route path="/compose">
      <Compose auth={loggedIn} />
    </Route>
    <Route path="/post/:postid">
      <Blog2 />
    </Route>

    </LoginContext.Provider>
    </Router>
  )
}

export default App;
