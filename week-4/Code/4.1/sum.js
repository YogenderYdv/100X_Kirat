const express=require('express');
const app=express();
const cors = require('cors');
const port=3000;

app.use(cors());


app.get('/',(req,res)=>{
    const {a,b}=req.query;
    const sum=parseInt(a)+parseInt(b);
    res.send(sum.toString());
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});