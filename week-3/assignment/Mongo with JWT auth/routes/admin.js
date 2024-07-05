const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin, Course } = require("../db");
const jwt=require('jsonwebtoken');
const jwtpassword="123";

// Admin Routes
router.post('/signup', async(req, res) => {
    // Implement admin signup logic
    const {username,password}=req.body;

    Admin.create({
        username:username,
        password:password
    });

    res.json({
        msg:'Admin created successfully'
    });
});

router.post('/signin', async(req, res) => {
    // Implement admin signup logic
    const {username,password}=req.body;

    const user=await Admin.find({
        username,
        password
    })

    if(user)
        {
            const token=jwt.sign({username:username},jwtpassword);
        res.json({
            token
            });
        }
    else
    {
        res.json({
            msg:'invalid username or password'
        });
    }
    
});

router.post('/courses', adminMiddleware, async(req, res) => {
    // Implement course creation logic

    const token=req.header.authorization;
    const {title,description,price,imageLink}=req.body;
    const newcourse=await consumers.create({
        title:title,
        description:description,
        price:price,
        imageLink:imageLink
    });

    res.json({
        msg:'Course created successfully'
    },{
        courseid:newcourse._id
    });
});


router.get('/courses', adminMiddleware, async(req, res) => {
    // Implement fetching all courses logic

    const token=req.headers.authorization;

    const data=await Course.find({});

    res.json({
        data
    });
});

module.exports = router;