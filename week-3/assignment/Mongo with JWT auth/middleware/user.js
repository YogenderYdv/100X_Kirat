const {JWT_SECRET} = require("../config");
const jwt = require("jsonwebtoken");
function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const {username,password}=req.headers;

    const token = req.headers.authorization;
    const words=token.split(" ");
    const jwttoken=words[1];

    const decode=jwt.verify(jwttoken,JWT_SECRET);
    if(decode.username)
        {
            next();
        }
    else
    {
        res.json({
            msg:'invalid'
        });
    }
}


module.exports = userMiddleware;