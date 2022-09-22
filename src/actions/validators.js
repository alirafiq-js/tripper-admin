import Validator from 'validator';
import isEmpty from "lodash-es/isEmpty";

const required = 'Required'
const invalid = 'Invalid'

export function loginValidator(data){
    let errors={}
    if(Validator.isEmpty(data.email)){
        errors.email=required;
    }
    if( Validator.isEmpty(data.password)){
        errors.password = required
    }
    if(!Validator.isEmpty(data.email) && !Validator.isEmail(data.email)){
        errors.email=invalid
    }
    return {errors, isValid: isEmpty(errors)}
}

export function scrumValidator(data){
    let errors={}
    if(Validator.isEmpty(data.today)){
        errors.today=required;
    }
    if(Validator.isEmpty(data.blockage)){
        errors.blockage = required
    }
    if(Validator.isEmpty(data.yesterday)){
        errors.yesterday=required
    }
    return {errors, isValid: isEmpty(errors)}
}