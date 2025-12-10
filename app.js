const express = require("express");
const connectDB = require("./database/database");
const Blog = require("./model/blogModel");
const app = express();
require("./database/database");
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    message: "We are live",
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

//create blog

app.post("/createBlog", async (req, res) => {
  const { title, description, subTitle } = req.body;
  const blog = await Blog.create({
    title,
    subTitle,
    description,
  });
  res.status(200).json({
    message: "Blog created successfully",
    blog,
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
