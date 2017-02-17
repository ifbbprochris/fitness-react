module.exports=function(){
    let args=Array.from(arguments);
    let clss=null,s=null;
    if(args.length==1){
        clss=args[0];
    }
    else if(args.length>1){
        s=args[0];
        clss=args[1];
    }
    let r='';
    if(Array.isArray(clss)){
        clss.map((cls)=>{
            switch(typeof cls){
                case 'string':
                    if(cls.indexOf('___')>-1){
                        r+=' '+cls;
                    }
                    else{
                        if(s!=null){
                            r+=' '+s[cls];
                        }
                    }
                    break;
                case 'object':
                    if(cls!=null){
                        Object.keys(cls).map((key)=>{
                            if(typeof cls[key]=='boolean'){
                                if(cls[key]){
                                    if(s!=null){
                                        r+=' '+s[key];
                                    }
                                }
                            }
                        });
                    }
                    break;
            }
        });
    }
    return r;
};