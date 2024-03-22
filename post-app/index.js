// express
const express = require('express');
const app = express();

// node modules
const path = require("path")

// dotenv
const dotenv = require("dotenv")
dotenv.config()

// Middleware for parsing JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Middleware for static files
app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/post_images", express.static(path.join(__dirname, "public/post_images")))

// Routers
const blogs = require("./routers/posts")
app.use(blogs)

// Start the server
const port = process.env.PORT ||3575
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});