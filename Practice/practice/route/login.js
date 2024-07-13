//zod,express,bcrypt,jwt,cors,mongoose
const express=require('express');
const app=express();

const middleware = require("../middleware/tokenVerify");


const { User } = require("../db/mongoose");
const jwt=require('jsonwebtoken');
const jwtpassword='1234';
const bcrypt = require('bcrypt');
const { emit } = require("process");
const saltround=10;

const port=3000;

app.use(express.json());
app.use(cors);

const schema=zod.object({
    username:zod.string(),
    email:zod.string().email(),
    password:zod.string()
});

app.post('/signup',async (req,res)=>{
    const {username,email,password}=req.body;

    try
    {
        schema.parse(username,email,password);

        const exist=await User.findOne({email});
        if(exist)
        {
            res.status(400).json({
                msg:'user already EXIST'
            });
            return;
        }

        const hashpassword=await bcrypt.hash(password,saltround);

        const data=await User.create({username,email,password:hashpassword});
        data.save();
        const token=jwt.sign({username:username,email:email},jwtpassword);
        res.status(200).json({
            token
        });
    }
    catch(error)
    {
        return res.status(500).json({
            msg:'Invalid INPUTS'
        });
    }
});

app.post('/login',middleware,async (req,res)=>{
    const {email,password}=req.body;
    const token=req.headers.authorization;

    try
    {
        const exist=await User.findOne({email});
        if(!exist)
        {
            res.status(500).json({
                msg:'Email does not EXIST'
            });
            return;
        }

        const ismatch=await bcrypt.compare(password,exist.password);
        if(!ismatch)
        {
            res.status(500).json({
                msg:'INVALID password'
            });
        }

        res.setHeader('authorizatoin',`Bearer ${token}`);
        res.status(200).json({
            msg:'login successfull'
        });
    }
    catch(error)
    {
        res.status(401).json({
            msg:'Invalid INPUTS'
        });
    }
});

app.get('/profile',middleware,(req,res)=>{
    res.status(200).json({
        msg:`welcome ${middleware.username}`
    });
});


app.listen(port,()=>{
    console.log(`server is running at ${port}`)
});