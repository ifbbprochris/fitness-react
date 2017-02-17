'use strict';
//库/框架
import React,{Component} from 'react';
import {Provider,connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import _ from 'lodash';
import {ImeComponent} from 'ime-react';
//action
import action from 'action';
//store
import store from 'store';
//组件
import { NavBar,List,InputItem,WhiteSpace,WingBlank,Button,Picker,DatePicker,Toast } from 'antd-mobile';
import Tab from '../tab';
//样式
import s from './index.less';
//工具
// import {request,validate} from 'util';
import request from '../../../../util/request';
import validate from '../../../../util/validate';

@connect(
    (state)=>{return {user_info:state.info.user_info}},
    (dispatch)=>{return {
        selfActions:bindActionCreators(action.self.creator,dispatch),
        infoActions:bindActionCreators(action.info.creator,dispatch),
        userActions:bindActionCreators(action.user.creator,dispatch),
    }}
)
export default class Info extends ImeComponent{
    constructor(props){
        super(props);
        this.state={
            user_info:props.user_info
        };
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.user_info!==this.state.user_info){
            this.setState({user_info:nextProps.user_info});
        }
    }
    submit(){
        const {user_info}=this.state;
        if(validate.validate(user_info,{
                nickname:[{
                    r:'empty',
                    err:'昵称不能为空'
                }],
                gender:[{
                    r:'empty',
                    err:'性别不能为空'
                }],
                height:[{
                    r:value=>parseInt(value)>0,
                    err:'身高格式不正确'
                }],
                weight:[{
                    r:value=>parseInt(value)>0,
                    err:'体重格式不正确'
                }],
            })){
            let pregnantTime={};
            if(!!user_info.pregnantTime){
                let demo = user_info.pregnantTime.format('YYYY-MM-DD');
                pregnantTime['pregnantTime']=demo;
            }
            let form=_.assign({},user_info,pregnantTime);
        }
    }
    render(){
        const {entry}=this.props;
        const {selfActions:{pop_history}}=this.props;
        const {user_info:{nickname,gender = 2,pregnantTime,height,weight}}=this.state;
        return (
            <div className={s.view+' '+(entry=='info'?'':s['not-info'])}>
                <NavBar
                    mode="light"
                    onLeftClick={()=>{
                        entry=='info'&&(pop_history());
                    }}
                >
                    {entry=='info'?'修改个人信息':'完善个人信息'}</NavBar>
                <WhiteSpace size="xl"/>
                <List>
                    <InputItem
                        clear
                        value={nickname}
                        onChange={(value)=>{
                            this.state.user_info.nickname=value;
                            this.forceUpdate();
                        }}
                    >昵称</InputItem>
                    <Picker
                        title="选择性别"
                        cols={1}
                        data={[{value:1,label:'男'},{value:2,label:'女'}]}
                        value={gender==1?[gender]:[2]}
                        onChange={(value)=>{
                            this.state.user_info.gender=value;
                            this.forceUpdate();
                        }}
                    >
                        <List.Item arrow="horizontal">选择性别</List.Item>
                    </Picker>
                    {
                        gender==2?<DatePicker
                            mode="date"
                            title="选择日期"
                            value={pregnantTime}
                            onChange={(value)=>{
                                this.state.user_info.pregnantTime=value;
                                this.forceUpdate();
                            }}
                        >
                            <List.Item arrow="horizontal">怀孕时间</List.Item>
                        </DatePicker>:null
                    }
                    <InputItem
                        type="number"
                        extra="cm"
                        clear
                        value={height}
                        onChange={(value)=>{
                            this.state.user_info.height=value;
                            this.forceUpdate();
                        }}
                    >身高</InputItem>
                    <InputItem
                        type="number"
                        extra="kg"
                        clear
                        value={weight}
                        onChange={(value)=>{
                            this.state.user_info.weight=value;
                            this.forceUpdate();
                        }}
                    >体重</InputItem>
                </List>
                <WhiteSpace size="xl"/>
                <WingBlank>
                    <Button type="primary" onClick={this.submit.bind(this)}>保存</Button>
                </WingBlank>
                <WhiteSpace/>
                <div style={{height:'110px'}}></div>
            </div>
        );
    }
}
