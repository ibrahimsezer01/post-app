const Post = require("../models/post");
const path = require("path")
const slugField = require("../helpers/slugfield");
const fs = require("fs");



// Route to handle post deletion
exports.post_delete_ById = async (req, res) => {
    try {
        const postId = req.params.postId
        const post = await Post.findOne({ where: {id: postId} })

        fs.unlinkSync(path.join(__dirname, "..", "public/post_images", post.image))

        if (post) {
            await post.destroy();
            return res.redirect("/")
        }
        res.redirect("/")
    } catch (error) {
        console.log(error);
    }
}

// Route to render the post deletion page
exports.get_delete_ById = async (req, res) => {
    try {
        const postId = req.params.postId
        const post = await Post.findOne({ attributes: ['id', 'title'] }, { where: {id: postId} })

        if (post) {
            return res.render("delete", {
                post: post
            })
        }

        res.redirect("/")

    } catch (error) {
        console.log(error);
    }
}

// Route to handle post update
exports.post_edit_ById = async (req, res) => {
    try {
        const postId = req.params.postId;
        const { title, content } = req.body;
        const post = await Post.findOne({ where: { id: postId } });
        
        if (!post) {
            return res.redirect("/");
        }
        
        let image = req.file ? req.file.filename : post.image;
        if (req.file) {
            fs.unlink(path.join(__dirname, "..", "public/post_images/", post.image), err => console.log(err));
        }

        // Post özelliklerini güncelle
        post.title = title;
        post.content = content;
        post.image = image;
        post.url = slugField(title);

        // Postu kaydet
        await post.save();

        return res.redirect("/");
    } catch (error) {
        console.error("Hata oluştu:", error);
        res.status(500).send("Bir hata oluştu.");
    }
};

// Route to render the post editing page
exports.get_edit_ById = async (req, res) => {
    try {
        const postId = req.params.postId
        const post = await Post.findOne({ where: { id: postId } })

        if (!post) {
            return res.redirect("/")
        }
        if (post) {
            return res.render("edit", {
                post: post
            })
        }
        
        res.redirect("/")
    } catch (error) {
        console.log(error);
    }
}

// Route to render the post creation page
exports.get_create = (req, res) => {
    try {
        res.render('create');
    } catch (error) {
        console.log(error);
    }
}

// Route to handle post creation
exports.post_create = async (req, res) => {
    try {
        const { title, content } = req.body
        const image = req.file

        await Post.create({
            title: title,
            content: content,
            image: image.filename,
            url: slugField(title)
        })
        res.redirect("/")
    } catch (error) {
        console.log(error);
    }
}

// Route to render the Post Details
exports.get_blog_details = async (req, res) => {
    try {
        const postId = req.params.postId
        const post = await Post.findOne({ where: {id: postId} })
        res.render("details", {
            post: post
        });
    } catch (error) {
        console.log(error);
    }
}

// Route to render the home page and display posts
exports.get_blog = async (req, res) => {
    try {
        const posts = await Post.findAll({
            attributes: ['id', 'title', 'content']
        })
        res.render('home', { posts });
    } catch (error) {
        console.log(error);
    }
}