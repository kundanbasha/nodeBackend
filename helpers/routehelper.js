const joi=require('joi');
module.exports={

    validatecreds:function (schema) {
        return function (req,res,next) {
            const result=joi.validate(req.body,schema);
            if(result.error){
                return res.status(400).json(result.error.message);
            }
            if(!req.value){req.value={};}
            req.value['body']=result.value;
            next();
        }
    },
    Schemas:{
        authschema:joi.object().keys({
            username:joi.string().required(),
            password:joi.string().required(),
            email:joi.string().email().required(),
            mobile:joi.number()
        })
    }

}