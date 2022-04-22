const express = require('express')
const User = require('../models/User')
const router = express.Router()
const { body, validationResult } = require('express-validator');

// Create a user using : POST "/api/auth/createuser" . NO LOGIN REQUIRED
router.post('/createuser',

    // checking validation for name,email,password
    [
        body('name').isLength({ min: 3 }),
        body('email').isEmail(),
        body('password').isLength({ min: 6 })

    ],
    async(req, res) => {

        // if there are errro . RETURN bad request and error corrosponds to same
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Check if the same email in database already exists
        try {
        let user= await User.findOne({email:req.body.email})

        // if user exists through error
        if (user){
            return res.status(400).json({error:"sorry user with this email already exists"})
        }

        // create a new user
        user=await Usser.create({
            name: req.body.name,
            password: req.body.password,
            email: req.body.email
          });

        // if user created successfully show DONE
          res.json({"Creation":"DONE"})
        } catch (error) {

            // Catch Error of try 
            console.error(error.message);
            res.status(500).send("some error occured")
        }
    })

module.exports = router