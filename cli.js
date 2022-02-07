#!/usr/bin/env node
require('@babel/register');

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const axios = require('axios');
const ora = require('ora');
const debug = require('debug');
const { io } = require('socket.io-client');
const execaSync = require('execa').commandSync;

const gpg = require('./gpg');

const socket = io('https://chatty-link.herokuapp.com');

socket.on('connect_error', (err) => {
  console.error('connection error', err);
});

const spinner = ora('Loading');
const log = debug('user');

// get bash username
const username = execaSync('whoami').stdout;

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

// flags -h, -c, -i are supposed to be used in seclusion
// using one negates the other
if (args.c) {
  // connect to an existing session
  spinner.text = `Connecting to an existing session with ${args.c}`;
  spinner.start();

  let guestKey;
  if (args.k) {
    guestKey = gpg.getPublicKey(args.k);
  } else {
    guestKey = gpg.myGpgKey();
  }
  const hostKey = gpg.getPublicKey(args.c);

  debug('joining a connection-----------------------');
  debug('key-> ' + hostKey + ':' + guestKey);
  request
    .post('/connection', {
      guestKey,
      hostKey,
    })
    .then((result) => {
      console.log('found roomId', result.data.roomId);
      spinner.stop();
      socket.emit('verify connection', { roomId: result.data.roomId });
      require('./components/App')({
        socket,
        roomId: result.data.roomId,
        username,
      });
    })
    .catch((e) => {
      console.error(e);
      process.exit(1);
    });
} else if (args.i) {
  // create a new session
  spinner.text = `Creating a new session with ${args.i}`;
  spinner.start();
  let hostKey;
  if (args.k) {
    hostKey = gpg.getPublicKey(args.k);
  } else {
    hostKey = gpg.myGpgKey();
  }
  const guestKey = gpg.getPublicKey(args.i);
  debug('creating a connection----------------------');
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
      require('./components/App')({ socket, roomId: result.data.id, username });
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
