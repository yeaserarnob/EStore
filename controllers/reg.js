var express=require('express');
var asyncValidator=require('async-validator');
var router=express.Router();
regModel=require.main.require('./models/reg-model');
regValidation=require.main.require('./Validation_rule/registration_validation');


// Request Handler

router.get('/',function(req,res){
	res.render('./reg/reg');
	
});


router.post('/',function(req,res){
	var data={
		name: req.body.name,
		username: req.body.username,
		email: req.body.email,
		phone: req.body.phone,
		password: req.body.password,
		address: req.body.address
	};
	
	var validator = new asyncValidator(regValidation.registration);
	validator.validate(data, function(errors, fields){
		
		console.log(errors);
		console.log('-----------------------------------------------------------');
		console.log(fields);

		if(errors)
		{
			res.render('reg/reg',{errors:errors});
		}
		else
		{
			if(req.body.name!='' && req.body.username!='' && req.body.email!='' && req.body.password!='' && req.body.cpassword!='')
			{
				if(req.body.password==req.body.cpassword)
				{
					regModel.validateUser(data,function(valid)
					{
						if(valid)
						{
							res.redirect('./login');
						}
						else
						{
							res.redirect('./error/regError');
						}
					});
				}
				else
				{
					res.redirect('./error/regError');
				}
			}
			else
				{
					res.redirect('./error/regError');
				}
		}
	});
});

//Exports

module.exports=router;

