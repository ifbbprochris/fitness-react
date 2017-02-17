'use strict';
//库/框架
import React,{Component} from 'react';
import {ImeComponent} from 'ime-react';
import {Provider,connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import _ from 'lodash';
//action
import action from 'action';
//store
import store from 'store';
//组件
//方法
//样式
import s from './index.less';
//工具

export default class UnderNav extends Component{
    constructor(props){
        super(props);
    }
    render(){
        const {noNav}=this.props;
        let className=s.view;
        if(noNav){
            className+=' '+s['no-nav'];
        }
        return (
            <div className={className}>
                {this.props.children}
            </div>
        );
    }
}