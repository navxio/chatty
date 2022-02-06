#!/usr/bin/env node
require('@babel/register');

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const axios = require('axios');
const ora = require('ora');
const debug = require('debug');
const gpg = require('./gpg');

const { io } = require('socket.io-client');
const socket = io('https://chatty-link.herokuapp.com');

socket.on('connect_error', (err) => {
  console.error('connection error', err);
});

const spinner = ora('Loading');
const log = debug('user');

const args = yargs(hideBin(process.argv))
  .usage('Usage: chatty [options]')
  .option('init', {
    alias: 'i',
    type: 'string',
    description: 'Initiate a chat session',
  })
  .option('connect', {
    alias: 'c',
    type: 'string',
    description: 'Connect to an existing session',
  })
  .option('default-key', {
    alias: 'k',
    type: 'string',
    description: 'default key identifier',
  })
  .help('h')
  .alias('h', 'help')
  .epilog('Copyright 2022 Navdeep Saini').argv;

const request = axios.create({
  baseURL: 'https://chatty-link.herokuapp.com',
  timeout: 5000,
});

/*
 * initiates a new session with a gpg key id
 *
 */

// flags -h, -c, -i are supposed to use in seclusion
// using one negates the utility of another
if (args.c) {
  // connect to an existing session
  spinner.text = `connecting to an existing session with ${args.c}`;
  spinner.start();
  const guestKey = gpg.myGpgKey();
  const hostKey = args.c;
  debug('joining a connection------------');
  debug('key-> ' + hostKey + ':' + guestKey);
  request
    .post('/connection', {
      guestKey,
      hostKey,
    })
    .then((result) => {
      log('result:' + JSON.stringify(result));
      spinner.stop();
      require('./components/App')({ socket });
    })
    .catch((e) => {
      console.error(e);
      process.exit(1);
    });
} else if (args.i) {
  spinner.text = `creating a new session with ${args.i}`;
  spinner.start();
  const hostKey = gpg.myGpgKey();
  const guestKey = gpg.getPublicKey(args.i);
  debug('creating a connection------------');
  debug('key-> ' + hostKey + ':' + guestKey);
  request
    .post('/session', {
      hostKey,
      guestKey,
    })
    .then((result) => {
      log('result data:' + JSON.stringify(result.data));
      spinner.stop();
      socket.emit('verify connection', { roomId: result.data.id });
      require('./components/App')({ socket, roomId: result.data.id });
    })
    .catch((e) => {
      console.error(e);
      process.exit(1);
    });
} else {
  log('moving to home screen');
  // no flag was passed - render a select screen carrying all gpg keys available for chat
  require('./components/ParticipantSelect');
}
