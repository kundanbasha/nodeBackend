const express=require('express');
const bodyParser=require('body-parser');
const router=require('express-promise-router')();
//const jwt=require('jsonwebtoken');
const basicControls=require('../controllers/basicControls');
const {validatecreds,Schemas}=require('../helpers/routehelper');
const passport=require('passport');
const jwt_passport=require('../passport');

router.use(bodyParser.json());

router.route('')
    .get(basicControls.home);
router.route('/students')
    .post(validatecreds(Schemas.authschema),basicControls.signUp)
    .get(passport.authenticate('jwt',{session:false}),basicControls.showAllStudents);

router.route('/signin')
    .post(basicControls.signIn);

module.exports=router;