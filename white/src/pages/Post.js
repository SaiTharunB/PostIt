import React, { useContext,  useState } from "react";
import { Link, useHistory} from "react-router-dom";
import {credentialsContext} from "../App";

export default function Posts()
{
    const [posts,setPosts] =useState([]);
    const [postText,setpostText]=useState("");
    const [postTitle,setpostTitle]=useState("");
    const [credentials]=useContext(credentialsContext);
    const history=useHistory("")
   const persist=(newPost)=>
    {
        fetch("http://localhost:4000/posts",{
            method: "POST",
            headers: {"Content-Type":"application/json",
            Authorization:`Basic ${credentials.username}:${credentials.password}`
        },
            body: JSON.stringify(newPost)
        })
       
    }
    const Add=(e)=>{
      e.preventDefault();
      if(!postText) return;
     const newPost={title:postTitle,user_name:credentials.username,text:postText}
      const newPosts=[...posts,newPost]
      setPosts(newPosts)
      setpostText("");
    persist(newPost)
       history.push("/")
 // window.location.reload("/",true)
    }
    return (
    <div className="container gen">
     {credentials &&<Link to="/" id="q">Home</Link>}
<form onSubmit={Add}>
  <div className="form-group">
    <label style={{color: "black",fontSize:"25px"}}>Title : </label>
    <input type="text" className="form-control" onChange={(e)=>setpostTitle(e.target.value)}></input>
  </div>
  <div className="form-group">
  <label style={{color: "black",fontSize:"20px"}}>Content : </label>
    <textarea className="form-control" rows="5" id="cont" onChange={(e)=>setpostText(e.target.value)}></textarea>
    <br/>
  </div>
  <button type="submit" className="btn btn-primary">Post</button>
</form>
    </div>
    )
}

