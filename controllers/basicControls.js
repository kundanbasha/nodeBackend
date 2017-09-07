const studentModel=require('../models/students');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const configs=require('../configs/config');
module.exports={
    home: async function(req,res,next){
        res.send('it came from controllers');
    },
    signUp: async function(req,res,next){
        const hash=await bcrypt.hash(req.value.body.password,10);
        const student=new studentModel({
            username:req.value.body.username,
            password:hash,
            email:req.value.body.email,
            mobile:req.value.body.mobile
        });
        const result=await student.save();
        const token=jwt.sign({
            issuer:'alambasha',
            sub:student.id,
            iat:new Date().getTime(),
            exp:new Date().setDate(new Date().getDate()+1)
        },configs.secret);
        res.status(200).json(token);
    },

    signIn:async function(req,res,next){

        const student=await studentModel.findOne({"email":req.body.email});
        if(!student){
            res.send("invalid email id");
        }
        const result=await bcrypt.compare(req.body.password,student.password);
        if(!result){
            res.send("invalid password");
        }
        const token=jwt.sign({
            issuer:'alambasha',
            sub:student.id,
            iat:new Date().getTime(),
            exp:new Date().setDate(new Date().getDate()+1)
        },configs.secret);
        res.status(200).json(token);
        //res.status(200).json(student);

    },

    showAllStudents: async function(req,res,next){
        const students=await studentModel.find();
        res.status(200).json(students);
    }
};