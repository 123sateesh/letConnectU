const express = require('express');
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const { body,validationResult} = require('express-validator');
const tokenChecker = require('../../middleware/tokenChecker');
const router = express.Router();

// Create a post
router.post('/',tokenChecker,[
 body("text","Please Enter Text here.").isLength({min:4}),
],
async (req, res )=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({msg:errors.array()});
    }
    try {
        const user = await User.findById({_id:req.user}).select('-password');
        const post = new Post({
            text :req.body.text,
            name : user.name,
            avatar:user.avatar,
            user :req.user
        })
        await post.save();
        res.json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({error:[{msg:"Server error."}]})
    }
});

// get all post 
router.get('/',
async (req, res )=>{
    try {
        const posts = await Post.find().sort({date:-1})
         if(!posts){
             return res.status(404).json({error:[{msg:"Post not found"}]})
             
         }
        res.json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({error:[{msg:"Server error."}]})
    }
});

// Get a post by Id
router.get('/:post_id',tokenChecker,
async (req, res )=>{
    try {
        const post = await Post.findById(req.params.post_id);
        //  if(post.user.toString() !== req.user){
        //     return res.status(404).json({error:[{msg:"Post not found"}]})
        //  }
         if(!post){
            
             return res.status(404).json({error:[{msg:"Post not found"}]})
         }
        res.json(post);
    } catch (error) {
        console.error(error);
        if(error.kind === "ObjectId"){
           
            return res.status(404).json({error:[{msg:"Post not found"}]})
        }
        res.status(500).json({error:[{msg:"Server error."}]})
    }
});

// Delete posts
router.delete('/',tokenChecker,
async (req, res )=>{
    try {
        const posts = await Post.findOneAndDelete({user:req.user});
         if(!posts){
        
             return res.status(404).json({error:[{msg:"Post not found"}]})
         }
        res.json({msg:"posts deleted."});
    } catch (error) {
        console.error(error);
        if(error.kind === "ObjectId"){
            return res.status(404).json({error:[{msg:"Post not found"}]})
        }
        res.status(500).json({error:[{msg:"Server error."}]})
    }
});

// Delete  a post by Id
router.delete('/:post_id',tokenChecker,
async (req, res )=>{
    try {
        const post= await Post.findByIdAndDelete(req.params.post_id);
         if(!post){
             return res.status(404).json({error:[{msg:"Post not found"}]})
         }
         if(post.user.toString() !== req.user){
            return res.status(404).json({error:[{msg:"Post not found"}]})
         }

        res.json({msg:"posts deleted."});
    } catch (error) {
        console.error(error);
        if(error.kind === "ObjectId"){
            return res.status(404).json({error:[{msg:"Post not found"}]})
        }
        res.status(500).json({error:[{msg:"Server error."}]})
    }
});

// like a post
// PUT request
// private
router.put('/likes/:id',tokenChecker,
async (req, res )=>{
    try {
         let post= await Post.findById(req.params.id);
            
       if(post.likes.filter(like => like.user.toString() === req.user).length > 0){
           return res.status(401).json({ error:[{msg:"post already liked."}]})
       }
         post.likes.unshift({user:req.user});
       await post.save();
       res.json(post.likes);

    } catch (error) {
        console.error(error);
        res.status(500).json({error:[{msg:"Server error."}]})
    }
});

// unlike a post
// PUT request
// private
router.put('/unlikes/:id',tokenChecker,
async (req, res )=>{
    try {
       let  post= await Post.findById(req.params.id);
       if(post.likes.filter(like => like.user.toString() === req.user).length == 0){
           return res.status(401).json({error:[{ msg:"post has not yet been liked."}]})
       }

       let removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user);
       post.likes.splice(removeIndex,1);
       await post.save();
       res.json(post.likes);

    } catch (error) {
        console.error(error);
        res.status(500).json({error:[{msg:"Server error."}]})
    }
});

// Put Comment
// POST request

router.post('/comments/:post_id',tokenChecker,[
    body("text","Comments is required.").isLength({min:2}),
   ],
   async (req, res )=>{
       const errors = validationResult(req);
       if(!errors.isEmpty()){
           return res.status(400).json({msg:errors.array()});
       }
       try {
           const user = await User.findById(req.user).select('-password');
           const post = await Post.findById(req.params.post_id);
            
           const newComment = {
               text :req.body.text,
               name : user.name,
               avatar:user.avatar,
               user : req.user
           }
           post.comments.unshift(newComment);
           await post.save();
           res.json(post.comments);
       } catch (error) {
           console.error(error);
           res.status(500).json({error:[{msg:"Server error."}]})
       }
   });

   // Delete  Comments
   router.delete('/comments/:post_id/:comment_id',tokenChecker,
async (req, res )=>{
    try {
       let  post = await Post.findById(req.params.post_id);
       if(!post){
        return res.status(404).json({error: [{ msg:"Post note found"}]});
       }

 // Pull out Comments
    const comment = post.comments.find(comment => comment.id  === req.params.comment_id);
       if(!comment){
        return res.status(404).json({ error:[{ msg:"Comments does not exist"}]});  
       }
        
       if(comment.user.toString() !== req.user){
           return res.status(401).json({ error :[{ msg:" User not authorized."}]})
       }
       let removeIndex = post.comments.map(comment => comment._id.toString( )).indexOf(req.params.comment_id);
       post.comments.splice(removeIndex,1);
       await post.save();
       res.json(post.comments);

    } catch (error) {
        console.error(error);
        if(error.kind === "ObjectId"){
            return res.status(404).json({error: [{ msg:"Post note found"}]});
        }
        res.status(500).json({error:[{msg:"Server error."}]})
    }
});

module.exports = router;