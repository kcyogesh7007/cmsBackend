const express = require("express");
const connectDB = require("./database/database");
const Blog = require("./model/blogModel");
const app = express();
const cors = require("cors");
require("./database/database");
connectDB();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    message: "We are lives",
  });
});

//get all blogs

app.get("/blogs", async (req, res) => {
  const blogs = await Blog.find();
  res.status(200).json({
    message: "Blogs fetched successfully",
    data: blogs,
  });
});

//get one blog

app.get("/blogs/:id", async (req, res) => {
  const { id } = req.params;

  const blog = await Blog.findById(id);
  if (!blog) {
    return res.status(400).json({
      message: "No Blog found",
    });
  }
  return res.status(200).json({
    message: "Blog fetched successfully",
    data: blog,
  });
});

//create blog

app.post("/createBlog", async (req, res) => {
  const { title, description, subTitle } = req.body;
  const blog = await Blog.create({
    title,
    subTitle,
    description,
  });
  res.status(201).json({
    message: "Blog created successfully",
    blog,
  });
});

//update blog
app.patch("/blogs/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, subTitle } = req.body;
  const blog = await Blog.findByIdAndUpdate(
    id,
    {
      title,
      description,
      subTitle,
    },
    { new: true }
  );

  res.status(200).json({
    message: "Blog updated successfully",
    data: blog,
  });
});

//delete api

app.delete("/blogs/:id", async (req, res) => {
  const { id } = req.params;
  await Blog.findByIdAndDelete(id);
  res.status(200).json({
    message: "Blog deleted successfully",
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
