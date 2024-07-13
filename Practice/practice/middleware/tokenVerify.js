const { User } = require("../db");
const jwt=require('jsonwebtoken');
const jwtpassword='1234';
async function middleware(req,res,next)
{
    const token=req.headers.authorization;
    const decode=jwt.verify(token,jwtpassword);

    const email=decode.email;

    const exist=User.findOne({email});
    if(!exist)
    {
        res.status(500).json({
            msg:'EMAIL does not EXIST'
        });
    }
    else
    {
        req.user=user;
        next();
    }
}
module.exports={
    middleware
}