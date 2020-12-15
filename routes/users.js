const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const { check,validationResult } = require('express-validator');
const SchemaUser = require('../schemas/user');
const config = require('config');
const auth = require('../middleware/authMiddleware');

router.get(
    '/',
    auth,
    async (req,res) => {
        try {
            const user = await (await SchemaUser.findById(req.user.id)).select('-password');
            res.json(user)
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({message: "Error with Server1"})
        }
    }
)

router.post(
    '/register',
    [
        check('email','This email is invalid. Please try again.').isEmail(),
        check('password','This password is invalid. Please try again.').not().isEmpty()
    ],
    async (req,res) => {
        try {
            let { email,password } = req.body;
            let user = await SchemaUser.findOne({ email });
            const errors = validationResult(req);

            if(!errors.isEmpty()){
                return res.status(401).json({ errors: errors.array()});
            }

            if(user){
                return res.status(401).json({ message: "This email is already registered."})
            }

            const salt = await bcryptjs.genSalt(15);
            password = await bcryptjs.hash(password,salt);

            user = new SchemaUser({
                email,
                password
            });
            
            await user.save();

            const payload = {
                user: {
                    id: user.id
                }
            }
            jwt.sign(
                payload,
                config.get('jwtSecret'),
                (err,token) => {
                    if(err) throw err;
                    res.json({ token })
                }
            )

            res.send('Ok.');
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({message: "Error with Server2"})
        }
    }
);

router.post(
    '/login',
    [
        check('email', "Please enter your email.").isEmail(),
        check('password', "Please enter a password.").not().isEmpty()
    ],
    async (req,res) => {
        try {

            const { email,password } = req.body;
            let user = await SchemaUser.findOne({ email })
            const errors = validationResult(req);

            if(!errors.isEmpty()){
                return res.status(401).json({errors: errors.array() });
            }

            if(!user){
                return res.status(401).json({message: "This email is not registered."})
            }

            let CheckPassword = await bcryptjs.compare(password,user.password);

            if(CheckPassword){

                const payload = {
                    user: {
                        id: user.id
                    }
                }
                jwt.sign(
                    payload,
                    config.get('jwtSecret'),
                    (err,token) => {
                        console.log(err)
                        if(err) throw err;
                        res.json({ token })
                    }
                )
            } else return res.status(401).json({message: "That password is invalid."})

        } catch (error) {
            console.log(error.message);
            return res.status(500).json({message: "Error with Server3"});
        }
    }
);


module.exports = router;