import {getActionType,getAction} from './common';
let type=getActionType('loading',{
    e_view_state:'',
});
let creator={
    e_view_state:getAction(type.e_view_state,'next'),
};
module.exports={
    type:type,
    creator:creator
};