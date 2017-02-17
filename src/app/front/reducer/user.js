import { combineReducers } from 'redux';
import {user} from 'action';
import _ from 'lodash';

function history(state=[],action){
    switch (action.type) {
        case user.type.push_history:
            return state.concat(action.route);
        case user.type.pop_history:
            return state.slice(0,state.length-1);
        default:
            return state;
    }
}
module.exports=combineReducers({
    history
});
