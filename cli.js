#!/usr/bin/env node
'use strict';
require('@babel/register');

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const args = yargs(hideBin(process.argv)).argv

require('./components/App.jsx');
