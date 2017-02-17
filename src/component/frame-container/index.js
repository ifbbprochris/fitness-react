'use strict';
//库/框架
import React,{Component} from 'react';
import {ImeComponent} from 'ime-react';
import {Provider,connect,Connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import _ from 'lodash';
//action
import action from 'action';
//store
import store from 'store';
//组件
import { NavBar } from 'antd-mobile';
//方法
//样式
import s from './index.less';
//工具
import {request,validate} from 'util';

class Frame extends ImeComponent{
    constructor(props){
        super(props);
        this.state={
            status:null
        };
        this.props2state(props);

    }
    props2state(props){
        this.state.status=props.status;
    }
    emit(){
        React.Children.map(this.props.children,(child)=>{
            if(child.type===Connect){
                FrameContainer.emitListener(child.type);
            }
            else{
                FrameContainer.emitListener(child.type.WrappedComponent);
            }
        });
    }
    componentWillReceiveProps(nextProps){
        this.props2state(nextProps);

        if(this.props.status!=nextProps.status&&nextProps.status=='enter'){
            this.emit();
        }
    }
    componentDidMount(){
        const {status}=this.props;
        if(status=='willEnter'){
            this._timer=setTimeout(()=>{
                this.state.status='enter';
                this.forceUpdate();
                this._timer=null;

                this.emit();
            },50);
        }
        else{
            if(this._timer!=null){
                clearTimeout(this._timer);
                this._timer=null;
            }
        }
    }
    componentDidUpdate(){
        const {status}=this.state;
        if(status=='willDestroy'){
            this.state.status='destroy';
            this.forceUpdate();
            setTimeout(()=>{
                const {onDestroy}=this.props;
                this.$exec(onDestroy);
            },450);
        }
    }
    getClassName(){
        const {status}=this.state;
        switch(status){
            case 'enter':
                return s.frame+' '+s.enter;
            case 'leave':
                return s.frame+' '+s.leave;
            case 'destroy':
                return s.frame+' '+s.destroy;
        }
        return s.frame;

    }
    render(){
        return (
            <div className={this.getClassName()}>
                {this.props.children}
            </div>
        );
    }
}

let listeners=[];
export default class FrameContainer extends Component{

    static addEventListener(type,callback){
        listeners.push({
            type:type,
            callback:callback
        });
    }
    static removeEventListener(type){
        let result=[];
        listeners.map(listener=>{
            if(listener.type!==type){
                result.push(listener);
            }
        });
        listeners=result;
    }
    static emitListener(type){
        listeners.map(listener=>{
            if(listener.type===type){
                listener.callback();
            }
        });
    }

    constructor(props){
        super(props);
        this.state={
            history:[],
        };
        this.props2state(props);
    }
    props2state(props){
        const {history}=props;
        let stateHistory=this.state.history;
        let nextNow=history[history.length-1];
        stateHistory.map(sItem=>{
            if(sItem.onDestroy!=null)return;
            if(history.find(item=>item===sItem.item)){
                if(sItem.item!==nextNow){
                    //非当前
                    sItem.status='leave';
                }
                else{
                    //当前
                    sItem.status='enter';
                }
            }
            else{
                sItem.status='willDestroy';
                sItem.onDestroy=()=>{
                    let {history}=this.state;
                    let index=history.findIndex(item=>item===sItem);
                    if(index>-1){
                        history.splice(index,1);
                        this.forceUpdate();
                    }
                };
            }
        });
        history.map(item=>{
            if(stateHistory.find(sItem=>item===sItem.item)==null){
                stateHistory.push({item:item,status:'willEnter'});
            }
        });
    }
    componentWillReceiveProps(nextProps){
        this.props2state(nextProps);
    }
    render(){
        const {history}=this.state;
        return (
            <div className={s.view}>
                {
                    history.map((item,i)=>{
                        return (
                            <Frame key={i} status={item.status} onDestroy={item.onDestroy}>
                                {item.item}
                            </Frame>
                        );
                    })
                }
            </div>
        );
    }
}