import {getActionType,getAction} from './common';
let type=getActionType('info',{
    e_user_info:'',
    e_other_user_info:'',
});
let creator={
    e_user_info:getAction(type.e_user_info,'next'),
    e_other_user_info:getAction(type.e_other_user_info,'next'),
};
module.exports={
    type:type,
    creator:creator
};