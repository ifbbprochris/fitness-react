import _ from 'lodash';
module.exports=function(props,ignores){
    var r=_.assignIn({},props);
    ignores.map((ignore)=>{
        if(r[ignore]!==undefined){
            delete r[ignore];
        }
    });
    return r;
};