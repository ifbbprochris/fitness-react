import { combineReducers } from 'redux';
import {loading} from 'action';
import _ from 'lodash';

function view_state(state={
    open:false
},action){
    switch (action.type) {
        case loading.type.e_view_state:
            return _.assign({},state,action.next);
        default:
            return state;
    }
}
module.exports=combineReducers({
    view_state
});
