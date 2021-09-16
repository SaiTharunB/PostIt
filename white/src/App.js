import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Register from "./pages/Register";
import Home from "./pages/Home.js";
import Login from "./pages/Login.js";
import Post from "./pages/Post.js";
import Ind from "./components/Ind.js";
import Header from "./Header";
import Footer from "./Footer";
import React,{ useState} from "react";
export const credentialsContext=React.createContext();
function App() {
  const credentialsState=useState(null);
 
  return (
    <div> 
      <Header />
<credentialsContext.Provider value={credentialsState}>
   <Router >
     <Switch>
      <Route exact path="/"><Home /></Route>
      <Route exact path="/register"><Register /></Route>
      <Route exact path="/login"><Login /></Route>
      <Route exact path="/post"><Post /></Route>
      <Route exact path="/post/:id" component={Ind}></Route>
      </Switch>  
   </Router>
   </credentialsContext.Provider>
   <Footer />
   </div>
  );
}

export default App;
