export function getActionType(prefix,type){
    Object.keys(type).map(function(key){
        type[key]=prefix+'_'+key;
    });
    return type;
}
export function getAction(type,...argNames){
    return function (...args) {
        let action = {type};
        argNames.map((name, index) => {
            action[name] = args[index]
        });
        return action;
    }
}