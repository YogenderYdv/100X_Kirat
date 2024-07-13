const express = require('express');
const { z } = require('zod');
const { middleware } = require('./tokenVerify');
const { User } = require('./mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;
const jwtpassword = '1234';
const saltround = 10;

app.use(express.json());


const schema = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string()
});

app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        schema.parse({ username, email, password });

        const exist = await User.findOne({ email });
        if (exist) {
            res.status(400).json({
                msg: 'User already exists'
            });
            return;
        }

        const hashpassword = await bcrypt.hash(password, saltround);

        const data = await User.create({ username, email, password: hashpassword });
        data.save();
        const token = jwt.sign({ username: username, email: email }, jwtpassword);
        res.status(200).json({
            token
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Invalid inputs'
        });
    }
});

app.post('/login',middleware, async (req, res) => {
    const { email, password } = req.body;
    const token=req.headers.authorization;
    try {
        const exist = await User.findOne({ email });
        if (!exist) {
            res.status(500).json({
                msg: 'Email does not exist'
            });
            return;
        }

        const ismatch = await bcrypt.compare(password, exist.password);
        if (!ismatch) {
            res.status(401).json({
                msg: 'Invalid password'
            });
            return;
        }

        res.setHeader('Authorization', `Bearer ${token}`);
        res.status(200).json({
            msg: 'Login successful'
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Internal server error'
        });
    }
});

app.get('/profile', middleware, (req, res) => {
    res.status(200).json({
        msg: `Welcome ${req.user.username}`
    });
});

app.listen(port, () => {
    console.log(`Server is running at ${port}`);
});
