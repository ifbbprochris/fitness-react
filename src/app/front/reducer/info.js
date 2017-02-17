import { combineReducers } from 'redux';
import {info} from 'action';
import _ from 'lodash';

function user_info(state={
    nickname:'',
    gender:null,
    pregnantTime:null,
    height:null,
    weight:null
},action){
    switch (action.type) {
        case info.type.e_user_info:
            return _.assign({},state,action.next);
        default:
            return state;
    }
}
function other_user_info(state={},action){
    switch (action.type) {
        case info.type.e_other_user_info:
            return _.assign({},state,action.next);
        default:
            return state;
    }
}
module.exports=combineReducers({
    user_info,other_user_info
});
