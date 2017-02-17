var startTime=new Date().getTime();
var filters=[{
    attr:'*',
    func:(k,v,s)=>{
        if(typeof v=='function'){
            s[k]=v();
        }
    }
},{
    attr:'zIndex',
    func:(k,v,s)=>{
        if(v=='front'){
            s[k]=Math.floor((new Date().getTime()-startTime)/10);
        }
    }
}];
function judge(k,standard){
    if(standard=='*')return true;
    var arr=standard.split(',');
    for(var i=0;i<arr.length;i++){
        if(arr[i]==k){
            return true;
        }
    }
    return false;
}
module.exports=function(style){
    Object.keys(style).map((key)=>{
        filters.map((filter)=>{
            if(judge(key,filter.attr)){
                filter.func(key,style[key],style);
            }
        });
    });
    return style;
};