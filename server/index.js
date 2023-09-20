const express = require("express");
const cors = require("cors");
const {connectDb} = require("./connection");
const BlogPost = require("./models/BlogPost")
const app = express();
const port = 5000;

connectDb();

// middleware
app.use(express.json());
app.use(cors());

// routes
// Route 1 : Post the blog

app.post("/post-blog",async (req,res)=>{
    let blog = new BlogPost({
        title: req.body.title,
        description: req.body.description,
    });
    await blog.save();
    res.json({message: "Welcome to my server",blog});
});

// Route 2: Get all blogs

app.get("/get-blogs", async (req, res) =>{
    let blogs = await BlogPost.find();
    if(!blogs){
        res.status(404).json({message: "No blogs found"});
    }
    res.json({blogs});
});

// Route 3: Delete

app.delete("/delete-blog/:id", async (req, res) => {
    let blog = await BlogPost.findByIdAndDelete(req.params.id);
    if(!blog) {
        res.status(404).json({message: "No blog found"});
    }
    res.status(200).json({ message: "Blog deleted successfully" });
});

// Route  4: Update blog

app.put("/update-blog/:id", async (req, res) => {
    let blog = await BlogPost.findByIdAndUpdate(req.params.id);

    if(!blog) {
        res.status(404).json({message: "No blog found"});
    }
    // blog.title = req.body.title;
    // blog.description = req.body.description;

    if(!req.body.title && !req.body.description){
        res.json({message: "Please enter title or discription"});
    }else if (!req.body.title) {
        blog.description = req.body.description;
    }else if(!req.body.description){
        blog.title = req.body.title;
    }else{
        blog.title = req.body.title;
        blog.description = req.body.description;
    }
    await blog.save();
    res.status(200).json({message: "Blog Updated Successfully", blog});
});

// listen server
app.listen(port,() => {
    console.log(`Server is running on port ${port}`);
});