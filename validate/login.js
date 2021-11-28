const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateLoginInput(data){
    let error = {};

    data.email = !isEmpty(data.email) ? data.email : "";
    data.pass = !isEmpty(data.pass) ? data.pass : "";

    if(Validator.isEmpty(data.email)){
        error.email = "bhai apna email fill karo";
    }
    else if(!Validator.isEmail(data.email)){
        error.email = "are chacha email galat hai firse fill karo";
    }

    if(Validator.isEmpty(data.pass)){
        error.pass = "kuch to bharo password me"
    }

    return{
        error,
        isValid: isEmpty(error)    }

}