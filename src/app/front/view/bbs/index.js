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
import {FrameContainer,UnderNav} from 'comp';
//方法
//样式
import s from './index.less';

//工具
import {request,validate} from 'util';

export default class BBS extends Component{
    constructor(props){
        super(props);
    }
    render(){
        let className='';
        if(window._temp.ratio==2){
            className=s['small-frame'];
        }
        else{
            className=s['normal-frame'];
            //http://dev.phone4rent.com:8081/forum
        }
        return (
            <UnderNav noNav={true}>
                <iframe src="https://www.baidu.com" className={className}/>
            </UnderNav>
        );
    }
}
