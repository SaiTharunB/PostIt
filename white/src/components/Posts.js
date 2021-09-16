import React, { useContext,  useEffect,  useState } from "react";
import { Link } from "react-router-dom";
import {credentialsContext} from "../App";
//import url from "../pages/Login";
const url="https://postit--server.herokuapp.com"
export default function Posts()
{
    const [posts,setPosts] =useState([]);
    const [credentials]=useContext(credentialsContext);
 useEffect(()=>{
    fetch(url+"/posts",{
        method: "GET",
        headers: {"Content-Type":"application/json",
        Authorization:`Basic ${credentials.username}:${credentials.password}`
    },
    }).then((response)=>response.json()).then((posts)=>setPosts(posts))
 },[credentials])
    return (
    <div>
        
        {posts.map((post)=>(
            <div key={post._id} className="post">
            <h4>Title : {post.title}</h4>
            <h6>Posted By : {post.user_name}</h6>
            <p>{post.text.substring(0,100)+"...    click on View More for more Info"}</p>
             <br/>
             {credentials && <Link to={"/post/"+post._id}>View More</Link>}
             <div>
       
    </div>
             </div>
        ))}

    </div>
    )
}