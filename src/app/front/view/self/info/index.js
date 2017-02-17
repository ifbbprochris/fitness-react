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
import { Progress,NavBar,List,WhiteSpace,WingBlank,Button,Modal,Popup } from 'antd-mobile';
import Inf from '../../info';
//方法
//样式
import s from './index.less';
//工具
import {request,validate} from 'util';

@connect(
    (state)=>{return {
        user_info:state.info.user_info,
        other_user_info:state.info.other_user_info
    }},
    (dispatch)=>{return {
        selfActions:bindActionCreators(action.self.creator,dispatch),
        infoActions:bindActionCreators(action.info.creator,dispatch),
    }}
)
export default class Info extends Component{
    constructor(props){
        super(props);
        this.state={
            percent:-1
        };

    }
    componentDidMount(){
    }
    exit(){
        Modal.alert('退出', '确定退出?', [
            { text: '取消'},
            { text: '确定',onPress:()=>{window.location.reload();}},
        ]);
    }
    render(){
        const {user_info:{nickname},other_user_info:{headimgurl}}=this.props;
        const {selfActions:{push_history}}=this.props;
        const {percent}=this.state;
        return (
            <div className={s.view}>
                {
                    percent>-1?<Progress percent={this.state.percent} position="fixed" />:null
                }
                <input type="file" id="upload" style={{display:'none'}}/>
                <WhiteSpace size="xl"/>
                <WhiteSpace size="xl"/>
                <div className={s.info}>
                    <img src={headimgurl} onClick={()=>{
                        const {percent}=this.state;
                        if(percent==-1){
                            $('#upload').click();
                        }
                    }}/>
                    <div className={s.desc}>点击修改头像</div>
                    <div className={s.name}>{nickname?(nickname.length>0?nickname:'无'):'无'}</div>
                </div>
                <WhiteSpace size="xl"/>
                <List>
                    <List.Item
                        extra={undefined}
                        wrap
                        onClick={()=>{
                            push_history(<Inf entry="info"/>);
                        }}
                        arrow="horizontal"
                    >个人信息</List.Item>
                </List>

                <WingBlank>
                    <WhiteSpace size="xl"/>
                    <Button style={{display:'none'}} onClick={this.exit.bind(this)}>退出</Button>
                </WingBlank>
            </div>
        );
    }
}
