import React from 'react';
import action from 'action';
import store from 'store';
import Tab from '../view/tab';
import Info from '../view/info';
import moment from 'moment';
export function loginSuccess(result){
    let data=result.data;
    if(!data.nickname){
        let demo = data.data;//安卓需要再次获取一次
        if(!!demo){
            data = demo;
        }
    }

    if(!data)return;
    let user_info={
        oid:data.oid,
        nickname:data.nickname,
        gender:data.gender,
        pregnantTime:data.pregnantTime?moment(data.pregnantTime):null,
        weight:data.weight,
        height:data.height,
    },other_user_info=data;
    store.dispatch(action.info.creator.e_user_info(user_info));
    store.dispatch(action.info.creator.e_other_user_info(other_user_info));
    if(!!data.nickname){
        store.dispatch(action.user.creator.push_history(<Tab/>));
    }
    else{
        store.dispatch(action.user.creator.push_history(<Info/>));
    }
}
