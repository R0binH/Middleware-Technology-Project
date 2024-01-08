const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

//Routes:

/*
* GET
* HOME
*/
router.get('', async (req, res) => {

    try {
        const locals = {
            title: "Node.Js Blog",
            description: "Simple Blog created with  Node.JS, Express and MongoDB."
        }
        let perPage = 10;
        let page = req.query.page || 1;

        const data = await Post.aggregate([{ $sort: { createdAt: -1 } }])
            .skip(perPage * page - perPage)
            .limit(perPage)
            .exec();

        const count = await Post.countDocuments();
        const nextPage = parseInt(page) + 1;
        const hasNextPage = nextPage <= Math.ceil(count / perPage);

        res.render('index', { locals, data, current: page, nextPage: hasNextPage ? nextPage : null, currentRoute: '/' }); //render index page
    } catch (error) {
        console.log(error);
    }
}); //GET

/*router.get('', async (req, res) => {
    const locals = {
        title: "Node.Js Blog",
        description: "Simple Blog created with  Node.JS, Express and MongoDB."
    }
    try {
        const data = await Post.find();
        res.render('index', { locals, data }); //render index page
    } catch (error) {
        console.log(error);
    }
}); //GET
*/


/*
function insertPostData(){
    Post.insertMany([
        {
            title: "Building a blog",
            body: "This is the body text"
        },
        {
            title: "Building a blog 2",
            body: "This is the body text 2"
        }
    ])
}
*/
//insertPostData();

/**
 * GET
 * Post :id
 */
router.get('/post/:id', async (req, res) => {

    try {

        let slug = req.params.id;
        const data = await Post.findById({ _id: slug });

        const locals = {
            title: data.title, //page title
            description: "Simple Blog created with  Node.JS, Express and MongoDB." //meta description
        }

        res.render('post', { locals, data, currentRoute: `/post/${slug}`  }); //render index page
    } catch (error) {
        console.log(error);
    }
});


/**
 * POST
 * Post - searchTerm
 */
router.post('/search', async (req, res) => {

    try {
        const locals = {
            title: "Search",
            description: "Simple Blog created with  Node.JS, Express and MongoDB."
        }
        let searchTerm = req.body.searchTerm;
        const searchNospecialChar = searchTerm.replace(/[^-zA-Z0-9 ]/g, "");


        const data = await Post.find({
            $or: [
                { title: { $regex: new RegExp(searchNospecialChar, 'i') } }, // enables to search in title...
                { body: { $regex: new RegExp(searchNospecialChar, 'i') } } // and in the body
            ]
        }
        );
        res.render("search", {
            data, locals
        });
    } catch (error) {
        console.log(error);
    }
})



router.get('/about', (req, res) => {
    res.render('about', {currentRoute: '/about' }); //render about page
}); //GET

module.exports = router;