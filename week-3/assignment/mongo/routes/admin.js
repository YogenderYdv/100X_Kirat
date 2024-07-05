const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin, Course } = require("../db");
// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const {username,password}=req.body;
    await Admin.create({
        username:username,
        password:password
    })

    res.json({
        msg:'Admin created successfully'
    });
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const {usename,password}=req.headers;

    const {title,description,price,imageLink}=req.body;

    const newCourse= await Course.create({
        title:title,
        description:description,
        price:price,
        imageLink:imageLink
    })

    newCourse.save();
    res.json({
        msg:'Course created successfully',
        courseId:newCourse._id
    })
});

router.get('/courses', adminMiddleware, async(req, res) => {
    // Implement fetching all courses logic
    const {usename,password}=req.headers;

    const data=await Course.find({});
    res.json({
        courses:data
    })
});

module.exports = router;