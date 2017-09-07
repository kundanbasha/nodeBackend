const passport=require('passport');
const jwt_stratey=require('passport-jwt').Strategy;
const extractor=require('passport-jwt').ExtractJwt;
const local=require('passport-local').Strategy;
const students=require('./models/students');
const configs=require('./configs/config');

const payload=async function (payloads,done) {
    try {
        const student=await students.findById(payloads.sub);
        if(!student){
            return done(null,false);
        }
        done(null,student);
    }
    catch(error) {
        done(error,false);
    }
};

passport.use(new jwt_stratey({
    jwtFromRequest:extractor.fromHeader('authorization'),
    secretOrKey:configs.secret
},payload));