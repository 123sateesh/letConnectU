const express = require("express");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const Post  = require('../../models/Post')
const { body, validationResult } = require("express-validator");
const tokenChecker = require("../../middleware/tokenChecker");
const request = require("request");
const config = require("config");
const { response } = require("express");
const router = express.Router();

// login Required !
router.get("/me", tokenChecker, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user}).populate(
      "user",
      ["name", "avatar"]
    );
    if (!profile) {
      return res
        .status(404)
        .json({ error: [{ msg:" No profile data availble for this user."}]});
    }
    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({error:[{msg:"Server error."}]})
  }
});

// Profile Creation and Updation.
router.post(
  "/",
  tokenChecker,
  [
    body("status", "Status is required").isLength({ min: 2 }),
    body("skills", "Please add some skills").isLength({ min: 2 }),
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    const {
      company,
      website,
      status,
      skills,
      location,
      githubusername,
      bio,
      maritalStatus,
      youtube,
      twitter,
      linkedIn,
      facebook,
      instagram,
      whatsapp,
    } = req.body;

    // These are Profile fields.
    const profileData = {};
    profileData.user = req.user;
    if (company) profileData.company = company;
    if (website) profileData.website = website;
    if (status) profileData.status = status;
    if (bio) profileData.bio = bio;
    if (location) profileData.location = location;
    if (githubusername) profileData.githubusername = githubusername;
    if (maritalStatus) profileData.maritalStatus = maritalStatus;
    if (skills) {
      profileData.skills = skills.split(",").map((skill) => skill.trim());
    }

    profileData.social = {};
    if (youtube) {
      profileData.social.youtube = youtube;
    }
    if (twitter) {
      profileData.social.twitter = twitter;
    }
    if (linkedIn) {
      profileData.social.linkedIn = linkedIn;
    }
    if (facebook) {
      profileData.social.facebook = facebook;
    }
    if (instagram) {
      profileData.social.instagram = instagram;
    }
    if (whatsapp) {
      profileData.social.whatsapp = whatsapp;
    }
    try {
      let user = await User.findOne({ _id: req.user });

      if (!user) {
        return res.status(401).json({ error: [{msg:"User Not Found"}]});
      }
      let profile = await Profile.findOne({ user: req.user });

      //  Updation profile
      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user },
          { $set: profileData },
          { new: true }
        );

        return res.json({ profile });
      }
      //Creation profile
      profile = new Profile(profileData);
      await profile.save();
      res.json({ profile });
    } catch (error) {
      console.error(error.messeage);
      res.status(500).json({error:[{msg:"Server error."}]})
    }
  }
);

// Get all profile
router.get("/", async (req, res) => {
  try {
    const profile = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({error:[{msg:"Server error."}]})
  }
});

//Get User profile userID
router.get("/user/:user_id", async (req, res) => {
  try {
          
           
             
    const profile = await Profile.findOne({user:req.params.user_id}).populate("user", [
      "name",
      "avatar",
    ]);
    if (!profile) return res.status(404).json({ error:[{msg:"Profile not found."}]});
    res.json(profile);
  } catch (error) {
    console.error(error);
    if(error.kind == 'ObjectId'){
     return res.status(404).json({Error:"Profile not found."})
    }
    res.status(500).json({error:[{msg:"Server error."}]})
  }
});

//Delete User and Profile

router.delete("/", tokenChecker, async (req, res) => {
  try {
    //Remove posts 
    await Post.deleteMany({user: req.user});
    // Remove Profile
    await Profile.findOneAndDelete({ user: req.user });
    //Remove User
    await User.findOneAndDelete({ _id: req.user });
    res.status(200).json({ Success: "User Deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({error:[{msg:"Server error."}]})
  }
});

// Add Experience

router.post(
  "/experience",
  tokenChecker,
  [
    body("title", "Title is required").isLength({ min: 2 }),
    body("company", "Company is required").isLength({ min: 2 }),
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    console.log(req.body)
    const { company, from, location, description,title } = req.body;
    const newExp = { company, from, location, description, title };

    try {
      
      const profile = await Profile.findOne({user : req.user});
      profile.experience.unshift(newExp);
      await profile.save();
      res.json(profile);
    } catch (error) {
      console.error(error);
      res.status(500).json({error:[{msg:"Server error."}]})
    }
  }
);
// Delete experience
router.delete("/experience/:exp_id", tokenChecker, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user });

    const removeIndex = profile.experience
      .map((item) => console.log(item.id))
      .indexOf(req.params.exp_id);
    console.log(removeIndex);
    profile.experience.splice(removeIndex, 1);
    await profile.save();

    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({error:[{msg:"Server error."}]})
  }
});

// Add Education setion here
router.post(
  "/education",
  tokenChecker,
  [
    body("school", "School is required").isLength({ min: 2 }),
    body("degree", "Degree is required").isLength({ min: 2 }),
    body("stream", "Stream is required").isLength({ min: 2 }),
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    const { school, degree, stream, description, from, to } = req.body;

    const newEducation = { school, degree, stream, description, from, to };

    try {
      // Remove Education deatils from the profile section.
      const profile = await Profile.findOne({ user: req.user });
      profile.education.unshift(newEducation);
      await profile.save();
      res.json(profile);
    } catch (error) {
      console.error(error);
      res.status(500).json({error:[{msg:"Server error."}]})
    }
  }
);
// Delete Education details from profile Section
router.delete("/education/:edu_id", tokenChecker, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user });

    const removeIndex = profile.education
      .map((item) => console.log(item.id))
      .indexOf(req.params.edu_id);
    profile.education.splice(removeIndex, 1);
    await profile.save();

    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({error:[{msg:"Server error."}]})
  }
});

// Getting github Repos
router.get("/github/:username", async (req, res) => {
  
  try {
    const options = {
      uri: `https://api.github.com/users/${
        req.params.username
      }/repos?per_page=5&sort=created:asc&client_id${config.get(
        "githubClientId"
      )}&client_secret${config.get("githubSecret")}`,
      method: "GET",
      headers: { "user-agent": "node.js" },
    };

    request(options,  (error, response, body) => {
      if (error) console.error(error);
      if (response.statusCode != 200) {
        return res.status(404).json({ error: [{msg:"No github profile found." }]});
      }
      // console.log("sending data of github");
      res.json(JSON.parse(body));
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({error:[{msg:"Server error."}]})
  }
});
module.exports = router;
