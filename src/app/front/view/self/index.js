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
import {FrameContainer} from 'comp';
import Info from './info';
//方法
//样式
import s from './index.less';
//工具
import {request,validate} from 'util';


@connect(
    (state)=>{return {history:state.self.history}},
    (dispatch)=>{return {actions:bindActionCreators(action.self.creator,dispatch)}}
)
export default class Self extends Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        const {actions:{push_history}}=this.props;
        push_history(<Info/>);
    }
    render(){
        const {history}=this.props;
        return (
            <FrameContainer history={history}/>
        );
    }
}