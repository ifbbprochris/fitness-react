'use strict';
import 'ime-bridge';
import _ from 'lodash';
import store from 'store';
var param=require('./param');
var request=require('./request');
import {user} from '../app/front/method';
import {Modal,Toast} from 'antd-mobile';

export function init(callback){
    window.imeBridge.$init(()=>{
        window.imeBridge.$sendMessage('getData','userInfo',(data)=>{
            try{
                data=JSON.parse(data);
                user.loginSuccess({data:data});
                if(typeof callback=='function'){(callback())};
            }
            catch(e){
                alert(e);
            }
        });
    });
    window.imeBridge.$addMethod('afterQrcode',(data)=>{
        //alert('调用扫描方法',data.url+'&gravidaOid='+store.getState().info.other_user_info.oid);
        if(data.url!=null){
            request.gravida4Doctor({
                url:data.url+'&gravidaOid='+store.getState().info.other_user_info.oid,
                ok:(result)=>{
                    Toast.success('扫描成功',2);
                }
            })
        }
    });
}
export function qrcode(){
    window.imeBridge.$sendMessage('route','qrcode');
}
