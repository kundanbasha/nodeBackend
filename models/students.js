const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const studentSchema=new Schema({
    username:{type:String,required:true},
    password:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    mobile:{type:Number,required:true,unique:true}
});

const studentModel=mongoose.model("students",studentSchema);
module.exports=studentModel;