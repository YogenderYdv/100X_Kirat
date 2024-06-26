const express=require('express');
const { totalmem } = require('os');
const app=express();
const port=3000;

app.use(express.json())

let user=[
    {healthy:false},
    {healthy:true}
]
app.get('/',(req,res)=>{
    let healthy=0;
    let total=user.length;
    for(let i=0;i<total;i++)
        {
            if(user[i].healthy)
                {
                    healthy++;
                }
        }

    let unhealthy=total-healthy;

    res.status(200).json({
        total:total,
        healthy:healthy,
        unhealthy:unhealthy
    });
})

app.post('/',(req,res)=>{
    const ishealthy=req.body.ishealthy;
    user.push({
        healthy:ishealthy
    });

    res.status(200).json({
        msg:'done!'
    });
})

app.put('/',(req,res)=>{
    for(let i=0;i<user.length;i++)
        {
            user[i].healthy=true;
        }

    res.json({});
});

app.delete('/',(req,res)=>{

    if(check())
        {
        //     let newarr=[];
        //     for(let i=0;i<user.length;i++)
        //     {
        //     if(user[0].healthy)
        //         {
        //             newarr.push({
        //                 healthy:true
        //             })
        //         }
        //     }

        // user[0].healthy=newarr;
        user=user.filter(user => user.healthy);
        res.send("done !").status(200);
        }
        else
        {
            res.status(411).json({
                msg:'you have no bad kidney'
            });
        }
    
})

function check()
{
    let onebad=false;
    for(let i=0;i<user.length;i++)
        {
            if(!user[0].healthy)
                {
                    onebad=true;
                }
        }
        return onebad;
}

app.listen(port,()=>{
    console.log(`server is tunning at ${port}`);
})