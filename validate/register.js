const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports =  function validateRegisterInput(data){
    let error = {};

    data.name = !isEmpty(data.name) ? data.name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.pass = !isEmpty(data.pass) ? data.pass : "";
    data.cpass = !isEmpty(data.cpass) ? data.cpass : "";



if(Validator.isEmpty(data.name)){
    error.name = "bhai apna naam to fill karo";
}

if(Validator.isEmpty(data.email)){
    error.email = "bhai apna email fill karo";
}
else if(!Validator.isEmail(data.email)){
    error.email = "are chacha email galat hai firse fill karo"
}

if(Validator.isEmpty(data.pass)){
    error.pass = "kuch to bharo password me"
}
if(Validator.isEmpty(data.cpass)){
    error.cpass = "password confirm karo"
}

if(!Validator.isLength(data.pass, {min: 5, max:10})){
    error.pass = "password at least 5 characters ka hona chaiye";
}

if(!Validator.equals(data.pass,data.cpass)){
    error.cpass = "password hi same nhi bhare ho, kya hi hoga tumhara"
}

return{
    error,
    isValid: isEmpty(error)
};

};

