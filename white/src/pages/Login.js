import React,{useState,useContext} from "react";
import { useHistory } from "react-router-dom";
import {credentialsContext} from "../App";
export const handleErrors= async (response)=>{
    if(!response.ok){
        const {message} = await response.json();
        throw Error(message);
    }
    return response.json();
}
 const url="https://postit--server.herokuapp.com"
export default function Login()
{
    const [username,setusername]=useState("");
    const [password,setpassword]=useState("");
    const [error,seterror]=useState("");
    const history=useHistory("");
    const [,setCredentials]=useContext(credentialsContext);
    const Login=(e)=>{
        e.preventDefault();
    fetch(url+"/login",{
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({username,password})
    })
    .then(handleErrors)
    .then(()=>{
      setCredentials({username,password})
        localStorage.setItem("creds",JSON.stringify({username,password}));
        history.push("/");
    })
    .catch((error)=>{seterror(error.message)});
    }
    return (
     <div className="container">
    
    <div className="header">
      {error && <h3>{error}</h3>}
  </div>
 <div className="content">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 contents">
          <div className="row justify-content-center">
            <div className="col-md-12">
              <div className="form-block">
                  <div className="mb-4">
                  <h2 style={{color: "black",fontSize:"30px"}}>Login In to <strong>PostIt</strong></h2>
                  
                </div>
                <form onSubmit={Login}>
                  <div className="form-group first">
                    <input type="text" className="form-control" id="username" placeholder="UserName"onChange={(e)=>setusername(e.target.value)}/>
                  </div>
                  <div className="form-group first">
                    <input type="password" className="form-control last" id="password" placeholder="Password" onChange={(e)=>setpassword(e.target.value)}/> 
                  </div>
                  <div className="form-group last mb-4">
                    <button type="submit" className="btn btn-warning" >Login</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          
        </div>
        
      </div>
    </div>
  </div>
  </div>
    );

}
