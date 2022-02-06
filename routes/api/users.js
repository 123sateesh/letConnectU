
const express = require('express');
const User = require('../../models/User')
const {body,validationResult}  = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt   = require('jsonwebtoken');
const config  = require('config');
const router = express.Router();
// var cors = require('cors');
// router.use(cors()); 

// 1. Regiser the user 
router.post('/',

[
    body('name', 'Name field is empty').isLength({min:2}),
    body('email', 'Enter vaild Email').isEmail(),
    body('password', 'password should be atleast 6 character long.').isLength({min:6}),
],
async (req, res ) => {
     const errors = validationResult(req);
      
     if(!errors.isEmpty()){
         return res.status(400).json({error:errors.array()})
     }
     const {name,email,password} = req.body;
      try {
 
          let user = await User.findOne({email});
          if(user){
             //  return res.status(401).json({"Alert":"User with this email already extis. "})
              return res.status(401).json( {error:[{msg:"User with this email already extis."}]});
            //   return res.status(401).json({error:msg.array()});
          }
 
         //  Create a avatar
          const avatar = gravatar.url(email,{
              s:"200",
              r:'pg',
              d:"mm"
          });
        
        //   const  salt = await bcrypt.genSalt(10);
        //   let pssword = await bcrypt.hash(password,salt);
        //   user = await User.create({name,email,password,avatar});  //Alternative way
          user =   new User({
              name,
              email,
              password,
              avatar
             
          })
          
          const  salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(password,salt);
          await user.save();
        //   res.json(user);

          // Sign with JWT and send a token to the user client.

         const payload ={
             user : user.id,
         } 

         // Here constrant is option but i am putting here.
          jwt.sign( 
          payload, 
          config.get('secureKey'),
          {expiresIn:360000},
          (error,token)=>{
            if(error) return error;
            res.json({token});
          }
          )
     }

     catch (error) {
          // console.error(error.messeage);
          res.status(500).json({error:[{msg:"Server error."}]})
     }
 
 });



module.exports = router;