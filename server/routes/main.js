const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

//Routes:

/*
* GET
* Homepage
*/
router.get('', async (req, res) => {

    try {
        const locals = {
            title: "Node.Js Shoppinglist",
            description: "Simple shoppinglist created with  Node.JS, Express and MongoDB."
        }
        const data = await Item.find();
        res.render('index', { locals, data }); //render index page
    } catch (error) {
        console.log(error);
    }
});


/**
 * GET
 * Item :id
 */
router.get('/item/:id', async (req, res) => {

    try {
        let slug = req.params.id;
        const data = await Item.findById({ _id: slug });

        const locals = {
            title: data.title, //page title
            description: "Simple shoppinglist created with Node.JS, Express and MongoDB." //meta description
        }

        res.render('item', { locals, data }); //render index page
    } catch (error) {
        console.log(error);
    }
});


/**
 * GET 
 * Create new Item
 */
router.get('/add-item', async (req, res) => {
    try {
        const locals = {
            title: "Add item",
            description: "Simple shoppinglist created with  Node.js, Express and MongoDB."
        }
        const data = await Item.find();
        res.render('add-item', { locals, data });
    } catch (error) {
        console.log(error);
    }
});


/**
 * POST 
 * Create new Item
 */
router.post('/add-item', async (req, res) => {
    try {
        //save into the database:
        try {
            const newItem = new Item({
                name: req.body.name,
                amount: req.body.amount,
                unit: req.body.unit
            });
            await Item.create(newItem);
            res.redirect('/')
        } catch (error) {
            console.log(error);
        }
    } catch (error) {
        console.log(error);
    }
});

/**
 * GET 
 * Edit Item
 */
router.get('/edit-item/:id', async (req, res) => {
    try {
        const locals = {
            title: "Edit item",
            description: "Simple shoppinglist created with  Node.JS, Express and MongoDB."
        }
        const data = await Item.findOne({ _id: req.params.id });
        res.render('edit-item', {
            locals,
            data
        });
    } catch (error) {
        console.log(error);
    }
});



/**
 * PUT 
 * Edit Item
 */
router.put('/edit-item/:id', async (req, res) => {
    try {
        await Item.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            amount: req.body.amount,
            unit: req.body.unit
        });
        res.redirect('/');
    } catch (error) {
        console.log(error);
    }
});


/**
 * DELETE 
 * Delete Item
 */
router.delete('/delete-item/:id', async (req, res) => {
    try {
        await Item.deleteOne({ _id: req.params.id });
        res.redirect('/');
    } catch (error) {
        console.log(error);
    }
});




/**
 * GET
 * Info
 */
router.get('/info', async (req, res) => {
    const locals = {
        title: "Information", //page title
        description: "Simple shoppinglist created with Node.JS, Express and MongoDB." //meta description
    }
    res.render('info', { locals }); //render info page
})

module.exports = router;