import React, {   useEffect, useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete"
import { Link} from "react-router-dom";
const url="https://postit--server.herokuapp.com" 
export default function Ind(props)
{
    const [credentials,setCredentials]=useState(null)
   function credGetter()
    {
      const x=JSON.parse(localStorage.getItem("creds"));
       setCredentials(x);
    }
    if(credentials==null)
    {
    window.onload=credGetter();
  }
  const [comments,setComments] =useState([]);
  const [comText,setcomText] = useState("");
  const [Data,setData] =useState("");
    useEffect(()=>{
        fetch(url+"/post/",{
            method: "POST",
            headers: {"Content-Type":"application/json",
            Authorization:`Basic ${credentials.username}:${credentials.password}`
        },
        body:JSON.stringify({id:props.match.params.id})
        }).then((response)=>response.json()).then((Data)=>setData(Data))
     },[credentials,props.match.params.id])
     const Add=(e)=>{
        e.preventDefault();
        if(!comText) return;
       const newComment={user_name:credentials.username,text:comText,post_id:props.match.params.id}
        const newComments=[...comments,newComment]
        setComments(newComments)
        setcomText("");
        console.log(newComment)
        persist(newComment)
      }
   
      const persist=(newComment)=>
      {
          fetch("http://localhost:4000/comment",{
              method:"POST",
              headers: {'Accept': 'application/json, text/plain, */*',"Content-Type":"application/json",
              Authorization:`Basic ${credentials.username}:${credentials.password}`
          },
              body: JSON.stringify(newComment)
          })
          window.location.reload("/",true)
      }  
      const Delete=(e)=>{
        fetch("http://localhost:4000/delete",{
            method:"PUT",
            headers: {'Accept': 'application/json, text/plain, */*',"Content-Type":"application/json",
            Authorization:`Basic ${credentials.username}:${credentials.password}`
        },
        body:JSON.stringify({post_id:props.match.params.id,comm_id:e})
        })
        console.log({post_id:props.match.params.id,comm_id:e})
        window.location.reload("/",true)
    }
   return(
    <div  className="container">
        {credentials &&<Link to="/" id="q">Home</Link>}
        <div key={Data._id} className="post">
        <h1>{Data.title}</h1>
        <p>{Data.text}</p>
        </div>
  <form onSubmit={Add}>
  <div className="form-inline container">
    <label style={{color: "black",fontSize:"20px"}}>Add your comment :</label>
    <textarea className="form-control" rows="2" id="combox" onChange={(e)=>setcomText(e.target.value)}></textarea>
    <br/>
    <button type="submit" className="btn btn-outline-primary logout">Comment</button>
  </div>
</form>
<div className="comment">
    {Data.comments ?  Data.comments.map((comment)=>(
        <div key={comment._id}>
            <h6>Commented By : {comment.user_name}</h6>
            <p>{comment.text}</p>
          {comment.user_name===credentials.username && <DeleteIcon fontSize="small" style={{color:"#fcab05"}} onClick={()=>Delete(comment._id)}/>}
            <hr/>
        </div>
    ))      :<p>No comments</p>    }
 </div>
    </div>
   )
}