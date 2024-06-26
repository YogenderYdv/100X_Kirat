let count=0;
setInterval(function(){
count=count+1;
console.log('counter: ',count);
if(count==10)
    {
        clearInterval(this);
    }
},1000)