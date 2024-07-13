const { User } = require('./mongoose');
const jwt = require('jsonwebtoken');
const jwtpassword = '1234';


async function middleware(req, res, next) {
    const token = req.headers.authorization;
    // if (token==null) {
    //     return res.status(401).json({ msg: 'No token provided' });
    // }
    try {
        const decode = jwt.verify(token, jwtpassword);
        const email = decode.email;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(500).json({
                msg: 'Email does not exist'
            });
        } else {
            req.user = user;
            next();
        }
    } catch (err) {
        return res.status(401).json({
            msg: 'Invalid token'
        });
    }
}

module.exports = {
    middleware
};


