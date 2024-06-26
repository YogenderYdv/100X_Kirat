const express = require('express');
const app = express();
const port = 3000;
const zod = require('zod');

// Define schemas for validation
const emailSchema = zod.string().email();
const passwordSchema = zod.string().min(5);

function middleware(req, res, next) {
    const username = req.headers.username;
    const email = emailSchema.safeParse(username);

    const pass = req.headers.pass;
    const password = passwordSchema.safeParse(pass);

    if (!email.success || email.data !== 'abc@gmail.com' || !password.success || password.data !== '12345') {
        res.status(400).json({
            msg: 'invalid'
        });
    } else {
        next();
    }
}

app.get('/', middleware, (req, res) => {
    res.json({
        msg: 'valid'
    });
});

// Global error handler
app.use(function(err, req, res, next) {
    res.status(500).json({
        msg: 'Upr kahi GALTI he !!'
    });
});

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});
