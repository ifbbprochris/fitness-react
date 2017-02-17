module.exports=function(){
    var url=window.location.href;
    url += '?';
    var strs = url.split('?');
    var str = strs[1];
    var map = {};
    var segs = str.split('&');
    for (var i in segs) {
        var seg = segs[i].replace('#','');
        var idx = seg.indexOf('=');
        if (idx < 0) {
            continue;
        }
        var name = seg.substring(0, idx);
        var value = seg.substring(idx + 1);
        map[name] = value;
    }
    return map;
};