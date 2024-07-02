//Db+jwt+zode.js
const express=require('express');
const port=3001;
const app=express();
const jwt=require('jsonwebtoken');
const mongoose=require('mongoose');

app.use(express.json());

mongoose.connect("mongoose-ID");

const User=mongoose.model('User',
    {
        name:String,
        email:String,
        pass:String
    }
);

app.post('/signup',async function(req,res){
    const {name,email,pass}=req.body;

    const userexist = await User.findOne({email:email});
    if(userexist)
        {
            return res.status(400).json({
                msg:'already exist',
            });
        }

        const newUser= new User({
            name:name,
            email:email,
            pass:pass
        });

        newUser.save();
        res.json({
            msg:"data saved !!"
        })
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
