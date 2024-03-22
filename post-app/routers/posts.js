const express = require("express")
const router = express.Router()
const blogs = require("../controllers/posts")
const imageUpload = require("../helpers/image-upload")


router.get("/delete/:postId", blogs.get_delete_ById)

router.post("/delete/:postId", blogs.post_delete_ById)

router.get("/edit/:postId", blogs.get_edit_ById)

router.post("/edit/:postId", imageUpload.upload.single("image"), blogs.post_edit_ById)

router.get("/create", blogs.get_create)

router.post("/create", imageUpload.upload.single("image"), blogs.post_create)

router.get("/:postId", blogs.get_blog_details)

router.get("/", blogs.get_blog)



module.exports = router