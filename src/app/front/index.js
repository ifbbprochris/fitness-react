'use strict';
//库/框架
import React,{Component} from 'react';
import {render} from 'react-dom';
import {Provider,connect} from 'react-redux';
import {bindActionCreators} from 'redux';
//action
import action from 'action';
//store
import store from 'store';
//组件
import {User,Tab,Loading} from 'view';
import {Modal,Toast} from 'antd-mobile';
//方法
import {loading,user} from './method';
//样式
import s from './index.less';
//工具
import {request,validate,native,iframe} from 'util';

export default class App extends Component {
    componentDidMount(){

    }
    render() {
        return (
            <Provider store={store}>
                <div className={s.view}>
                    <User/>
                    <Loading/>
                </div>
            </Provider>
        );
    }
}

if(1){
    let data=`{
    "role": "1",
    "gender": 1,
    "pregnantTime": "2016-10-06",
    "openid": "",
    "headimgurl": "http://localhost:8081/resource/img/backta2.jpg",
    "mobile": "13520676216",
    "nickname": "Chris",
    "height": 175,
     "weight": 74,
     "oid": 1,
     "xsid": ""
    }`;
    user.loginSuccess({data:JSON.parse(data)});
    render(<App></App>, document.getElementById('app'));
}
else {
    native.init(()=>{
        // 获取到用户信息
        render(<App></App>, document.getElementById('app'));
    });
}
