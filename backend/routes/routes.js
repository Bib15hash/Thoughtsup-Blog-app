const express = require('express');
const fs = require('fs');
const path = require('path')
const router = express.Router();
const Blog = require('../Schema/BlogSchema');
const multer = require('multer');
 

var storage = multer.diskStorage({   
    destination: function(req, file, cb) { 
        cb(null, './public/uploads/');    
    }, 
    filename: function (req, file, cb) { 
        cb(null , file.originalname);   
    }
});

const upload = multer({
    storage: storage,
    limits : {fileSize : 5000000}
});

router.get('/post', (req,res) => {
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

    Blog.find()
        .sort([[sortBy, "desc"]])
        .exec((err, doc) => {
         if (err) {
           return res.status(400).json({
             error: "No blogs found",
           });
         }
         res.json(doc);
        });
});


router.post('/post', upload.single('image'), (req,res) => {
    console.log(req.file)

    const obj = new Blog({
        title: req.body.title,
        content: req.body.content,
        user: req.body.user,
        image: req.file === undefined ? '' : req.file.filename
    })
        
    Blog.create(obj, (err, item) => {
            if (err) {
                res.json({message: err})
            }
            else {
                // item.save();
                res.json(item);
            }
    });

    
})


router.get('/post/:id', (req,res) => {
    const blog = Blog.findById({_id: req.params.id}).exec((err,blog) => {
        if(err) {
            res.json({message: err})
        } else {
            res.send(blog)
        }
    })
})


router.delete('/post',(req,res) => {
    Blog.deleteMany({}, (err) => {
        if (err) {
            res.json({message: "Could not delete records"})
        } else {
            res.send("Records deleted succesfully!!")
        }
    })
});

router.delete('/post/:id', async (req,res) => {
    try {
        const blog = await Blog.findByIdAndRemove({_id: req.params.id})
        res.json({message: 'Blog deleted successfully'})
    }
    catch(err) {
        res.json({message: 'Could not delete blog'})
    }
});


router.patch('/like', (req,res) => {
    console.log('backend: ', req.body)
    
    Blog.findByIdAndUpdate(req.body.postId, {
        $addToSet: {likes: req.body.userId}
    }, {
        new: true
    }).exec((err, result) => {
        if (err) {
            return res.status(422).json({error: err})
        } else {
            return res.json(result)
        }
    })
})


router.patch('/unlike', (req,res) => {
    console.log('unlike', req.body)
    Blog.update({_id: req.body.postId}, 
        {$pull: {likes : req.body.userId}})
    .exec((err,data) => {
        if (err) console.log(err);
        else {
            console.log('data', data);
            res.json({data})
        }
    })
})



module.exports = router;
