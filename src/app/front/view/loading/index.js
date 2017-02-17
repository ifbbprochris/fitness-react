'use strict';
//库/框架
import React,{Component} from 'react';
import {Provider,connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import _ from 'lodash';
//action
import action from 'action';
//store
import store from 'store';
//组件
import {ActivityIndicator} from 'antd-mobile';
//样式
import s from './index.less';

@connect(
    (state)=>{return {v:state.loading.view_state}},
)
export default class Loading extends Component{
    constructor(props){
        super(props);
    }
    render(){
        const {v:{open}}=this.props;
        return (
            <ActivityIndicator
                toast
                text="加载中"
                animating={open}
                color="white"
                size="large"
            />
        );
    }
}