//JWT 
const express=require('express');
const app=express();
const jwt=require('jsonwebtoken');
const jwtpass='12345';
const port=3000;

app.use(express.json());

const all_user=[
  {
    name:'harkirat',
    email:'harkirat@gmail.com',
    pass:'123'
  },
  {
    name:'abc',
    email:'abc@gmail.com',
    pass:'12345'
  },
  {
    name:'raman',
    email:'raman@gmail.com',
    pass:'1234'
  }
];

function check(name,email,pass)
{
  return all_user.some((user)=>user.name==name && user.email==email && user.pass==pass);
}

app.post('/login',(req,res)=>{
  const {name,email,pass}=req.body

  if(!check(name,email,pass))
    {
      return res.status(403).json({
        msg:'NOT exist !!'
      });
    }

    let token=jwt.sign({email:email,name:name},jwtpass,{expiresIn:'1h'});
    return res.status(200).json({
      token,
    })
});

app.get('/checktoken',(req,res)=>{
  const token=req.headers.authorization;

  try
  {
    const decode=jwt.verify(token,jwtpass);
    const email=decode.email;
    const name=decode.name;

    if(!all_user.some((user)=>user.email==email && user.name==name))
      {
        return res.status(403).json({
          msg:'unthorized token !!',
        })
      }
      const otheruser=all_user.filter((user)=>user.email!==email);
      return res.status(200).json({
        otheruser,
      });
  }
  catch(error)
  {
    return res.status(400).json({
      msg:'invalid token',
    });
  }
});

app.listen(port,()=>{
  console.log(`server is running ar ${3000}`);
});