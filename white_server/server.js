require("dotenv").config();
const { Mongoose } = require("mongoose");
const express=require("express");
cors=require("cors");
mongoose=require("mongoose");
const app=express();
app.use(cors());
// app.use(function(req, res){
//     res.header({"Access-Control-Allow-Origin":"*"});
//   })
//app.options('*', cors());
app.use(express.json());
//mongoose.set('useFindAndModify', false);
mongoose.connect(process.env.DB_URL,{useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false});
const UserSchema = new mongoose.Schema({
    username: String,
    password: String
  });
  const User = mongoose.model('User', UserSchema);
  const postSchema = new mongoose.Schema({
    title: String,
    user_name : String,
    text: String,
    comments:[ {user_name:String,text:String}]
   
  });
  const Post = mongoose.model('Post', postSchema);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    app.listen(process.env.PORT||4000,function(req,res)
    {
        console.log("server is running");
    });
});
app.post("/register", async function(req,res)
{ 
    const {username,password} = req.body;
    const user=await User.findOne({username});
    if(user){
        res.status(500),
        res.json({message:"user already registered"});
        return;
    }
    await User.create({username,password});
    res.json({
        message:"success"}
    )
});
app.post("/login", async function(req,res)
{ 
    const {username,password} = req.body;
    const user=await User.findOne({username});
    if(!user || user.password!==password){
        res.status(500),
        res.json({message:"invalid credentials"});
        return;
    }
    
    res.json({
        message:"success"}
    )
});
app.post("/posts", async function(req,res)
{ 
 const {authorization}=req.headers;
 const [,token]=authorization.split(" ");
 const [username,password]=token.split(":")
 const postsItems=req.body;
 const user=await User.findOne({username});
 if(!user || user.password!==password){
    res.status(403),
    res.json({message:"invalid credentials"});
    return;
}
    await Post.create(
        {
            "user_name":user.username,
            "title":postsItems.title,
            "text":postsItems.text,
            "comments":[]
        }
    )


});
app.get("/posts", async function(req,res)
{ 
 const {authorization}=req.headers;
 const [,token]=authorization.split(" ");
 const [username,password]=token.split(":")
 const todosItems=req.body;
 const user=await User.findOne({username});
 if(!user || user.password!==password){
    res.status(403),
    res.json({message:"invalid credentials"});
    return;
}
const posts= await Post.find();
return(res.json(posts))
});
app.post("/comment", async function(req,res)
{ 
 const {authorization}=req.headers;
 const [,token]=authorization.split(" ");
 const [username,password]=token.split(":")
 const postsItems=req.body;
 const id=postsItems.post_id
 const user=await User.findOne({username});
 if(!user || user.password!==password){
    res.status(403),
    res.json({message:"invalid credentials"});
    return;
}
comment={user_name:postsItems.user_name,text:postsItems.text}
//console.log(postsItems)
 await Post.findOneAndUpdate(
     {_id:id},
     {
     $push:{comments:comment}
    })
    return(res.json({message:"COmmented"}))
   
});
app.post("/post/", async function(req,res)
{ 
 const {authorization}=req.headers;
 const [,token]=authorization.split(" ");
 const [username,password]=token.split(":")
 const postsItems=req.body;
 const user=await User.findOne({username});
if(!user || user.password!==password){
    res.status(403),
    res.json({message:"invalid credentials"});
    return;
}
const post= await Post.findOne({_id:postsItems.id});
return(res.json(post))
});
app.put("/delete", async function(req,res)
{ 
 const {authorization}=req.headers;
 const [,token]=authorization.split(" ");
 const [username,password]=token.split(":")
 const postsItems=req.body;
 const user=await User.findOne({username});
 if(!user || user.password!==password){
    res.status(403),
    res.json({message:"invalid credentials"});
    return;
}
post_id=postsItems.post_id
comm_id=postsItems.comm_id
try{
    const post = await Post.updateOne(
      { _id: post_id },
      { $pull: { comments: { _id: comm_id } } }
    );
    res.status(200).json(post, + "Comment Deleted!")
  }catch(err){
    res.status(400).json({messsage: err})
  }
});
