import _ from 'lodash';

function attachment2number(attachment){
    var hor=[{name:'left',value:0},{name:'center',value:0.5},{name:'right',value:1}];
    var ver=[{name:'top',value:0},{name:'middle',value:0.5},{name:'bottom',value:1}];
    var h=0;
    var v=0;
    for(var i=0;i<hor.length;i++){
        if(attachment.indexOf(hor[i].name)>-1){
            h=hor[i].value;
        }
        if(attachment.indexOf(ver[i].name)>-1){
            v=ver[i].value;
        }
    }
    return {
        h:h,
        v:v
    };

}
export function getRelativePos(conf){
    var defaultConf={
        self:null,
        selfAttachment:'left top',
        target:document.body,
        targetAttachment:'left top'
    };
    _.assignIn(defaultConf,conf);

    var left=0;
    var top=0;
    var origin='0 0';
    var selfAttach=attachment2number(defaultConf.selfAttachment);
    origin=`${selfAttach.h*100}% ${selfAttach.v*100}%`;

    var targetAttach=attachment2number(defaultConf.targetAttachment);
    var targetOffset=defaultConf.target.getBoundingClientRect();
    left=targetOffset.left-selfAttach.h*defaultConf.self.offsetWidth+targetAttach.h*defaultConf.target.offsetWidth;
    top=targetOffset.top-selfAttach.v*defaultConf.self.offsetHeight+targetAttach.v*defaultConf.target.offsetHeight;

    return {
        left:left,
        top:top,
        transformOrigin:origin
    };
}