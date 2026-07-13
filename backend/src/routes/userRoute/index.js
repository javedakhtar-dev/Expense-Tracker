require("dotenv").config();
const express = require('express');
const authMiddleware = require("../../middleware/authMiddleware");
const { userSignup, userSignin, updateProfile, updatePassword } = require('../../utils/types');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const { User } = require("../../config/db");
const router = express.Router();

router.use(express.json())

router.post('/signup', async (req, res) => {
    const inputPayload = req.body;
    const parsedPayload = userSignup.safeParse(inputPayload);

    if(!parsedPayload.success) {
        return res.status(409).json({
            error: "Inputs are not valid"
        })
    }

    try {
        const { username, firstName, lastName, password} = parsedPayload.data;
        const isExist = await User.findOne({username});

        if(isExist) {
            return res.status(409).json({
                error: "User already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const addUser = await User.create({
            username,
            firstName,
            lastName,
            password: hashedPassword
        })

        const jwtToken =  jwt.sign({
            userId: addUser._id
        }, process.env.JWT_SECRET_KEY)

        const token = 'Bearer ' + jwtToken; 

        return res.json({
            firstName,
            token
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: 'Something went wrong'
        })
    }
})

router.post('/signin', async (req, res) => {
    const signinPayload = req.body;
    const parsedPayload = userSignin.safeParse(signinPayload);

    if(!parsedPayload.success) {
        return res.status(409).json({
            error: 'Inputs are wrong'
        })
    }

    try {
        const { username, password } = parsedPayload.data;
        const user = await User.findOne({username})

        if(!user) {
            return res.status(401).json({
                msg: "Invalid username"
            }); 
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        
        if (!isPasswordCorrect) {
            return res.status(401).json({
                msg: "Invalid password"
            });
        }

        const jwtToken = await jwt.sign({
            userId: user._id
        }, process.env.JWT_SECRET_KEY)
        
        const token = "Bearer " + jwtToken;
        return res.json({
            msg: "Logged in successfully",
            firstName: user.firstName,
            token: token
        });
    } catch (err) {
        console.log(err);
    }
})

router.get('/me', authMiddleware, async (req, res) => {
    
    const user = await User.findOne({
        _id: req.userId
    }, {
        _id: true,
        username: true,
        firstName: true
    })
    
    return res.json({
        user
    })
})

router.put('/profile', authMiddleware, async (req, res) => {
    const upatePayload = req.body;
    const parsedPayload = updateProfile.safeParse(upatePayload);
    const userId = req.userId;

    if(!parsedPayload.success){
        return res.status(409).json({
            error: 'Inputs are wrong'
        })
    }

    try {
        const { firstName, lastName } = parsedPayload.data;
        const updateProfile = await User.updateOne({
            _id: userId
        }, {
            firstName: firstName,
            lastName: lastName
        });

        return res.json({
            msg: 'Profile updated successfully'
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            error: "Something went wrong"
        })
    }
})

router.put('/password', authMiddleware, async (req, res) => {
    const updatePasswordPayload = req.body;
    const parsedPayload = updatePassword.safeParse(updatePasswordPayload);

    if(!parsedPayload.success){
        return res.status(409).json({
            error: 'Input are not valid'
        })
    }
    
    try {
        const { oldPassword, newPassword } = parsedPayload.data;
        const user = await User.findOne({
            _id: req.userId
        })
        const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
        
        if(!isPasswordCorrect) {
            return res.status(409).json({
                error: "Wrong password"
            })
        }

        const isSamePassword = await bcrypt.compare(newPassword, user.password);

        if (isSamePassword) {
            return res.status(400).json({
                error: "New password must be different from the old password"
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        const updatePassword = await User.updateOne({
            _id: req.userId
        }, {
            password: hashedPassword
        })

        return res.json({
            msg: "Password updated successfully"
        })

    } catch (err) {
        return res.status(500).json({
            error: 'Something went wrong'
        })
    }
})

module.exports = router;