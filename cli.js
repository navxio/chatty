#!/usr/bin/env node
require('@babel/register')

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const axios = require('axios')
const ora = require('ora')
const pkg = require('./package')
const gpg = require('./gpg')

const args = yargs(hideBin(process.argv))
              .usage('Usage: chatty [options]')
              .option('init', {
                alias: 'i',
                type: 'string',
                description: 'Initiate a chat session'
              })
              .option('connect', {
                alias: 'c',
                type: 'string',
                description: 'Connect to an existing session'
              })
              .help('h')
              .alias('h', 'help')
              .epilog('Copyright 2022 Navdeep Saini')
              .argv

const request = axios.create({
  baseURL: 'https://chatty.link',
  timeout: 5000
})

/*
* initiates a new session with a gpg key id
  *
*/

// flags -h, -c, -i are supposed to use in seclusion
// using one negates the utility of another
if (args.c) {
  // connect to an existing session
  const spinner = ora(`connecting to an existing session with ${args.c}`)
  const guestKey = gpg.myGpgKey()
  const hostKey = args.c
  request.post('/connection', {
          guestKey,
          hostKey
  }).then(() => {
      spinner.stop()
  })
  .catch(e => {
      console.error(e)
      process.exit(1)
  })
} else if (args.i) {
  const spinner = ora(`creating a new session with ${args.i}`).start()
  const myGpgKey = gpg.myGpgKey()
  const theirKey = gpg.getPublicKey(args.i)
  request.post('/session', {
    hostKey: myGpgKey,
    guestKey: theirKey
  }).then(() => {
      spinner.stop()
  })
  .catch(e => {
      console.error(e)
      process.exit(1)
  })
} else {
  // no flag was passed - render a select screen carrying all gpg keys available for chat
  require('./components/ParticipantSelect')
}
