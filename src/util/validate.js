var defaultErrorHandle=function (err){
};
function errorHandle(err,value){
    if(typeof err=='function'){
        err(value);
    }
    else{
        defaultErrorHandle(err);
    }
}
module.exports={
    setDefaultErrorHandle:function(value){
        defaultErrorHandle=value;
    },
    validate:function(data,rules){
        var result=true;
        if(rules==null){
            return result;
        }
        var keys=Object.keys(rules);
        for(var i=0;i<keys.length;i++){
            var key=keys[i];
            var rs=rules[key];
            for(var j=0;j<rs.length;j++){
                var rule=rs[j];
                var {r,err}=rule;
                if(r instanceof RegExp){
                    result=r.test(data[key]);
                }
                else if(typeof r=='function'){
                    result=r(data[key]);
                }
                else if(typeof r=='string'){
                    switch(r){
                        case 'mobile':
                            result=/^1(3|4|5|7|8)\d{9}$/.test(data[key])
                            break;
                        case 'null':
                            result=((value)=>{
                                return value!=null;
                            })(data[key]);
                            break;
                        case 'empty':
                            result=((value)=>{
                                return value!=null&&value.length>0;
                            })(data[key]);
                            break;
                        default:
                            result=true;
                    }
                }
                if(result==false){
                    errorHandle(err,data[key]);
                    return result;
                }
            }
        }
        return result;
    }
};