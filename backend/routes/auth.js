const express = require('express')
const User = require('../models/User')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { json } = require('express');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "youcannothackme"

// Create a user using : POST "/api/auth/createuser" . NO LOGIN REQUIRED
router.post('/createuser',

    // checking validation for name,email,password
    [
        body('name').isLength({ min: 3 }),
        body('email').isEmail(),
        body('password').isLength({ min: 6 })

    ],
    async (req, res) => {
        let success=false

        // if there are error . RETURN bad request and error corrosponds to same
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            success=false
            return res.status(400).json({ success,errors: errors.array() });
        }

        // Check if the same email in database already exists
        try {
            let user = await User.findOne({ email: req.body.email })

            // if user exists through error
            if (user) {
                success=false
                return res.status(400).json({ success,error: "sorry user with this email already exists" })
            }


            // Salt and Hashing of password
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt)

            // create a new user
            user = await User.create({
                name: req.body.name,
                password: secPass,
                email: req.body.email
            });

            const data = {
                user: {
                    id: user.id
                }
            }

            const authtoken = jwt.sign(data, JWT_SECRET);
            success=true
            res.json({ success,authtoken })
        } catch (error) {

            // Catch Error of try 
            console.error(error.message);
            res.status(500).send("Internal Server Error")
        }
    })

// Authenticate a user using : POST "/api/auth/createuser" . NO LOGIN REQUIRED
router.post('/login',

    // checking validation for email,password
    [
        body('email', 'Enter a valid email').isEmail(),
        body('password', 'Password cannot be blank').exists()

    ],
    async (req, res) => {
        let success=false

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body

        try {
            let user = await User.findOne({ email })

            // check if user exists 
            if (!user) {
                success=false
                return res.status(400).json({success, error: "Please Try To LogIn With Correct Details" })
            }

            const passwordCompare=await bcrypt.compare(password,user.password)

            // check for correct password
            if(!passwordCompare){
                success=false
                return res.status(400).json({ success,error: "Please Try To LogIn With Correct Details" })
            }
            const data = {
                user: {
                    id: user.id
                }
            }
            const authtoken = jwt.sign(data, JWT_SECRET);
            success=true
            res.json({success, authtoken })

        } catch (error) {

            // Catch Error of try 
            console.error(error.message);
            res.status(500).send("Internal Server Error")
        }


    })


// Get loggedIn user details using : POST "/api/auth/getuser" .LOGIN REQUIRED

router.post('/getuser',fetchuser,async (req, res) => {
        try {
            let userId=req.user.id
            const user=await User.findById(userId).select("-password")
            res.send(user)
        } catch (error) {

            // Catch Error of try 
            console.error(error.message);
            res.status(500).send("Internal Server Error")
        }


    })

module.exports = router