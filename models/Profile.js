const mongoose = require("mongoose");
const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  company: {
    type: String,
  },
  website: {
    type: String,
  },
  location: {
    type: String,
  },
  status: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
    required: true,
  },
  bio: {
    type: String,
  },
  githubusername: {
    type: String,
  },
  maritalStatus: {
    type: String,
  },
  // this array of experience fields
  experience: 
   [
      {
        title: {
          type: String,
          required: true,
        },
      company: {
        type: String,
        required: true,
      },
      location: {
        type: String,
      },
      from: {
        type: Date,
        
      },
      to: {
        type: Date,
        
      },
      current: {
        type: Boolean,
        default: false,
      },
      description: {
        type: String,
      },
    },
  ],

  // this array of  Education fields
  education:[ 
  {
      school: {
        type: String,
      },
      degree: {
        type: String, 
      },
      stream: {
        type: String,
      },
      from: {
        type: Date,
        
      },
      to: {
        type: Date,
       
      },
      current: {
        type: Boolean,
        default: false,
      },
      description: {
        type: String,
      },
    },
  ],
  

  //Array for Socials Fields.
  social: 
    {
      youtube: {
        type: String,
      },
      twitter: {
        type: String,
      },
      linkedIn: {
        type: String,
      },
      facebook: {
        type: String,
      },
      instagram: {
        type: String,
      },
      whatsapp: {
        type: String,
      },
    },
  
  date:{
      type:Date,
      default:Date.now
  }
});
module.exports = Profile = mongoose.model("profile", ProfileSchema);
