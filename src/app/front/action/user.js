import {getActionType,getAction} from './common';
let type=getActionType('user',{
    push_history:'',
    pop_history:'',
});
let creator={
    push_history:getAction(type.push_history,'route'),
    pop_history:getAction(type.pop_history),
};
module.exports={
    type:type,
    creator:creator
};