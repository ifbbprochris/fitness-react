'use strict';
import {createStore,applyMiddleware,combineReducers} from 'redux';
import thunk from 'redux-thunk';
import reducers from 'reducer';

let createStoreWithMiddleware=applyMiddleware(thunk)(createStore);
let store=createStoreWithMiddleware(combineReducers(reducers));
module.exports=store;
