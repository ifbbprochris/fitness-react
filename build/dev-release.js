#!/usr/bin/env node
var log=require('npmlog');
var execSync = require('child_process').execSync;
execSync('gulp rel');
