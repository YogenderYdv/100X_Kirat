const mongoose=require('mongoose');

mongoose.connect('mongodb+srv://yogender2603:2asa0DhmgIW59O2h@cluster0.dicszan.mongodb.net/');

const UserSchema=new mongoose.Schema({
    username:{type:String,require:true,unique:true},
    email:{type:String,require:true,unique:true},
    password:{type:String,require:true,unique:true}
});

const User=mongoose.model('User',UserSchema);

module.exports={
    User
}