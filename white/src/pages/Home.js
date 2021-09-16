import React,{useContext} from "react";
import { Link } from "react-router-dom";
import {credentialsContext} from "../App";
import Posts from "../components/Posts";

export default function Home()
{
    const [credentials,setCredentials]=useContext(credentialsContext);
    function credGetter()
    {
      const x=JSON.parse(localStorage.getItem("creds"));
       setCredentials(x);
    }
    if(credentials==null)
    {
    window.onload=credGetter();
  }
    const logout=()=>{
    setCredentials(null);
    localStorage.removeItem("creds");
    }
    return(
        <div className="container">
        <div className="welcome">
            {credentials && <button onClick={logout} className="btn btn-outline-danger logout">Logout</button>}
            
     <span><h2>Welcome {credentials && credentials.username }</h2></span>
     {credentials &&<Link to="/post" id="p">Post</Link>}
     <br></br>
     {!credentials &&<Link to="/register" id="reg">Register</Link>}
    <br></br> {!credentials &&<Link to="/login" id="log">Login</Link>}
    
    {credentials && <Posts />}
</div>
     </div>
    )

}