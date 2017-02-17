'use strict';
//库/框架
import React,{Component} from 'react';
import {Provider,connect} from 'react-redux';
import {bindActionCreators} from 'redux';
//action
import action from 'action';
//store
import store from 'store';
//组件
import { NavBar,TabBar,Icon } from 'antd-mobile';
import Self from '../self';
import BBS from '../bbs';
//方法
//样式
import s from './index.less';
//工具
import {request,validate} from 'util';

export default class Tab extends Component{
    constructor(props){
        super(props);
        this.state={
            selectedTab:'bbs'
        };
    }
    render(){
        return (
            <TabBar
                unselectedTintColor="#949494"
                tintColor="#33A3F4"
                barTintColor="white"
            >
                <TabBar.Item
                    title="论坛"
                    key="论坛"
                    icon={{ uri: 'http://ykyl.oss-cn-qingdao.aliyuncs.com/material/11.png' }}
                    selectedIcon={{ uri: 'http://ykyl.oss-cn-qingdao.aliyuncs.com/material/12.png' }}
                    selected={this.state.selectedTab === 'bbs'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'bbs',
                        });
                    }}
                >
                    <BBS/>
                </TabBar.Item>
                <TabBar.Item
                    icon={{ uri: 'http://ykyl.oss-cn-qingdao.aliyuncs.com/material/41.png' }}
                    selectedIcon={{ uri: 'http://ykyl.oss-cn-qingdao.aliyuncs.com/material/42.png' }}
                    title="我"
                    key="我"
                    selected={this.state.selectedTab === 'self'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'self',
                        });
                    }}
                >
                    <Self/>
                </TabBar.Item>
            </TabBar>
        );
    }
}
