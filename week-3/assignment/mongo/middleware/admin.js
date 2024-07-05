// Middleware for handling auth
const { Admin } = require("../db");
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const {username,password}=req.headers;

    const exist=Admin.findOne({username:username});

    if(!exist)
        {
            res.json({
                msg:'Admin does not exist !!'
            });
        }
    else
    {
        next();
    }
}

module.exports = adminMiddleware;