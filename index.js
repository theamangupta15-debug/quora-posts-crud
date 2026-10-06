const express = require("express");
const path = require("path");
const app = express();
const port = 8080;
const { v4: uuid } = require("uuid");
const methodoverRide = require("method-override");

app.use(express.urlencoded({extended :true}));
app.use(methodoverRide("_method"));

app.set("view engine","ejs");
app.set("views", path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

let posts = [
    {
        id: uuid(),
        username: "apna college",
        content: "sigma 8.0"
    },
    {
        id: uuid(),
        username: "aman gupta",
        content: "hardworking is important"
    },
    {
        id: uuid(),
        username: "rahul Kumar",
        content: "i love solving dsa que"
    }
];

app.get("/posts", (req,res)=>{
   res.render("index.ejs", {posts});
});

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
})

app.post("/posts", (req, res) => {
    let { username, content } = req.body;
    let id = uuid();
    posts.push({
        id,
        username,
        content
    });

    res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
    let { id } = req.params;

    let post = posts.find((p) => id === p.id);

    res.render("show.ejs", { post });
});

app.patch("/posts/:id",(req,res)=>{
    let { id } = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    console.log(post);
    res.redirect("/posts");
})

app.get("/posts/:id/edit",(req,res)=>{
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", {post});

})

app.delete("/posts/:id",(req,res)=>{
    let { id } = req.params;
    posts = posts.filter((p) => id !== p.id);
    
    res.redirect("/posts");
})

app.listen(port,()=>{
    console.log("app is listening");
});

