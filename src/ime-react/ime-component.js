'use strict';
import React, {Component} from 'react';
import _ from 'lodash';

export default class ImeComponent extends Component {
    constructor(props) {
        super(props);
    }
    $exec(){
        let args=Array.from(arguments);
        args.length>0&&(typeof args[0]=='function')&&(args[0].apply(null,args.slice(1)));
    }
}
