// Middleware for handling auth
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config");
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const {username,password}=req.headers;

    const token = req.headers.authorization;
    const words=token.split(" ");
    const jwttoken=words[1];
    try
    {
        const decode=jwt.verify(jwttoken,JWT_SECRET);
        if(decode.username)
            {
                next();
            }
        else
        {
            res.json({
                msg:'not valid'
            });
        }
    }
    catch(e)
    {
        res.json({
            msg:'Invalid !!'
        });
    }
}

module.exports = adminMiddleware;