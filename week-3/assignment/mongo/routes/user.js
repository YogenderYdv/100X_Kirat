const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");
const { default: mongoose } = require("mongoose");


// User Routes
router.post('/signup', async (req, res) => {
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

router.get('/courses', async(req, res) => {
    // Implement listing all courses logic
    const {username,password}=req.headers;

    const newCourse=await Course.find({});

    res.json({
        Course:newCourse
    });
});

router.post('/courses/:courseId', userMiddleware, async(req, res) => {
    // Implement course purchase logic
    // X person has selected a particular W course of CourseId(given my user in url)
    //how ?
    const {username,password}=req.headers;
    const courseId=req.params.courseId;

    await User.updateOne({
        username:username,
    },{
        "$push":{
            purchasedCourses:courseId
        }
    });
    res.json({
        message: "Purchase complete!"
    })
});

router.get('/purchasedCourses', userMiddleware, async(req, res) => {
    // Implement fetching purchased courses logic
    const {username,password}=req.headers;
    
    const user=await User.findOne({
        username:username
    })

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