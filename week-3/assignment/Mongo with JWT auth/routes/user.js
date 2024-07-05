
const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");
const { default: mongoose } = require("mongoose");
const jwt=requie('jsonwebtoken');
const jwtpassword="123";

// User Routes
router.post('/signup', async(req, res) => {
    // Implement user signup logic
    const {username,password}=req.body;

    await User.create({
        username:username,
        password:password
    });

    res.json({
        msg:'User created successfully'
    });
});

router.post('/signin', async(req, res) => {
    // Implement admin signup logic
    const {username,password}=req.body;

    const token=jwt.sign({username:username},jwtpassword);

    res.json({
        token
    });
});

router.get('/courses', async(req, res) => {
    // Implement listing all courses logic

    const token=req.headers.authorization;

    const data=await Course.find({});
    res.json({
        data
    });
});

router.post('/courses/:courseId', userMiddleware, async(req, res) => {
    // Implement course purchase logic

    const token=req.headers.authorization;
    const courseid=req.params.courseId;

    await User.updateOne({
        username:username
    },{
        "$push":{purchasedCourses:courseid}
    });
    res.json({
        message: "Purchase complete!"
    })
});

router.get('/purchasedCourses', userMiddleware, async(req, res) => {
    // Implement fetching purchased courses logic
    const token=req.headers.authorization;

    const user=await User.findOne({
        username:username
    });
    console.log(purchasedCourses);

    const data=await User.find({
        _id:{
            "$in":user.purchasedCourses
        }
    });

    res.json({
        course:data
    });
});

module.exports = router