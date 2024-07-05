const { User } = require("../db");
function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const {username,password}=req.headers;

    const exist = User.findOne({username:username});
    if(!exist)
        {
            res.json({
                msg:'User does not exist!!'
            });
        }
    else
    {
        next();
    }
}

module.exports = userMiddleware;