const { rejects } = require('assert');
const fs=require('fs');

fs.readFile("a.txt","utf-8",(err,data)=>{
    console.log('data from a.txt:',data)
});

let a=0;
for(let i=0;i<10000;i++)
    {
        a+=i;
    }

console.log(a);
