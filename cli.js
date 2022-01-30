#!/usr/bin/env node
require('@babel/register')

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const args = yargs(hideBin(process.argv)).argv
const axios = require('axios')
const ora = require('ora')
const gpg = require('./gpg')

const request = axios.create({
  baseURL: 'https://chatty.link',
  timeout: 5000
})

/*
* initiates a new session with a gpg key id
  *
*/
if (args.i) {
  ora(`creating a new session with ${args.i}`).start();
  const myGpgKey = gpg.myGpgKey()
  const theirKey = gpg.getPublicKey(args.i)
  request.post('/session', {
    hostKey: myGpgKey,
    guestKey: theirKey
  }).then(() => {
  })
  .catch(e => {

  })

} else if (args.c) {
  // connect to an existing session
  ora(`connecting to an existing session with ${args.c}`)
        const guestKey = gpg.myGpgKey()
        const hostKey = args.c
        request.post('/connection', {
                guestKey,
                hostKey
        }).then(() => {
        })
        .catch(e => {

        })

} else if (args.h) {
        require('./components/Help')
}
else {
        console.log('participant select')
        // list all gpg keys
        require('./components/ParticipantSelect')
}
