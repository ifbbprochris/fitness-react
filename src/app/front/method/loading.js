import action from 'action';
import store from 'store';
export function open(){
    store.dispatch(action.loading.creator.e_view_state({open:true}));
}
export function close(){
    store.dispatch(action.loading.creator.e_view_state({open:false}));
}