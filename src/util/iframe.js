'use strict';

let context={};
window.imeIframeBridge={
    getContext:()=>{
        return context;
    },
    setContext:(key,value)=>{
        setIframeContext(key,value);
    },
    route:()=>{}
};
export function setIframeContext(key,value){
    if(typeof key=='object'){
        _.assign(context,key);
    }
    else if(typeof key=='string'){
        context[key]=value;
    }
}