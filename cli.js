#!/usr/bin/env node
require('@babel/register');

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const args = yargs(hideBin(process.argv)).argv

require('./index')
// require('./components/App.jsx');
