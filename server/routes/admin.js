const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');
const bcrypt = require('bcrypt'); //encrypt and decrypting the password for storing in database
const jwt = require('jsonwebtoken');

const adminLayout = '../views/layouts/admin';
const jwtSecret = process.env.JWT_SECRET;


//cookie:
/**
 * Check Login
 * */
const authMiddleware = (req, res, next) => {
    const token = req.cookies.token; //getting the cookies from the browser
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.userId = decoded.userId;
        next();
    }
    catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}


/**
 * GET 
 * Admin - Login Page
 */
router.get('/admin', async (req, res) => {

    try {
        const locals = {
            title: "Admin",
            description: "Simple Blog created with  Node.JS, Express and MongoDB."
        }
        const data = await Post.find();
        res.render('admin/index', { locals, layout: adminLayout });
    } catch (error) {
        console.log(error);
    }
});


/**
 * POST 
 * Admin - Check Login
 */
router.post('/admin', async (req, res) => {
    try {
        const { username, password } = req.body;

        //checking if user exists:
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        //checking if password is correct:
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        //cookie token:
        const token = jwt.sign({ userId: user._id }, jwtSecret);
        res.cookie('token', token, { httpOnly: true });

        res.redirect('/dashboard'); //redirect to route dashboard if user succesfully logged in

        console.log(req.body);
        res.redirect('/admin');




        res.render('admin/index', { layout: adminLayout });
    } catch (error) {
        console.log(error);
    }
});



/**
 * GET 
 * Admin - Dashboard
 */
router.get('/dashboard', authMiddleware, async (req, res) => {
    try {
        const locals = {
            title: "Admin Dashboard",
            description: "Simple Blog created with  Node.JS, Express and MongoDB."
        }


        const data = await Post.find();
        res.render('admin/dashboard', { locals, data, layout: adminLayout });
    } catch (error) {
        console.log(error);
    }




});

/**
 * GET 
 * Admin - Create new Post
 */
router.get('/add-post', authMiddleware, async (req, res) => {
    try {
        const locals = {
            title: "Add post",
            description: "Simple Blog created with  Node.JS, Express and MongoDB."
        }


        const data = await Post.find();
        res.render('admin/add-post', { locals, data, layout: adminLayout });
    } catch (error) {
        console.log(error);
    }
});



/**
 * POST 
 * Admin - Create new Post
 */
router.post('/add-post', authMiddleware, async (req, res) => {
    try {
        // console.log(req.body);

        //save into the database:
        try {
            const newPost = new Post({
                title: req.body.title,
                body: req.body.body
            });

            await Post.create(newPost);
            res.redirect('/dashboard')
        } catch (error) {
            console.log(error);
        }


    } catch (error) {
        console.log(error);
    }
});

/**
 * GET 
 * Admin - Edit Post
 */
router.get('/edit-post/:id', authMiddleware, async (req, res) => {
    try {
        const locals = {
            title: "Add post",
            description: "Simple Blog created with  Node.JS, Express and MongoDB."
        }
        const data = await Post.findOne({ _id: req.params.id });
        res.render('admin/edit-post', {
            locals,
            data,
            layout: adminLayout
        });
    } catch (error) {
        console.log(error);
    }
});



/**
 * PUT 
 * Admin - Edit Post
 */
router.put('/edit-post/:id', authMiddleware, async (req, res) => {
    try {
        await Post.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            body: req.body.body,
            updatedAt: Date.now()
        });
        res.redirect(`/edit-post/${req.params.id}`);
    } catch (error) {
        console.log(error);
    }
});


/**
 * DELETE 
 * Admin - Delete Post
 */
router.delete('/delete-post/:id', authMiddleware, async (req, res) => {
    try {
        await Post.deleteOne({ _id: req.params.id });
        res.redirect('/dashboard');
    } catch (error) {
        console.log(error);
    }
});



/** POST 
 * Admin - Register
 */
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            const user = await User.create({ username, password: hashedPassword });
            res.status(201).json({ message: 'user created', user });
        }
        catch (error) {
            if (error.code === 11000) {
                res.status(409).json({ message: 'User already in use' });

            }
            res.status(500).json({ message: 'Internal server error' });
        }


    } catch (error) {
        console.log(error);
    }
});

/** GET 
 * Admin - Logout
 */
router.get('/logout', (req, res)=>{
   res.clearCookie('token');
   // res.json({message: 'Logout succesful'}); 
   res.redirect('/');
})



module.exports = router;