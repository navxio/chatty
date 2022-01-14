#!/usr/bin/env node
require('@babel/register')

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const args = yargs(hideBin(process.argv)).argv
const Conf = require('conf')
const axios = require('axios')
const ora = require('ora')
const gpg = require('./util/gpg')
const config = new Conf()

const request = axios.create({
  baseURL: 'https://chatty.link',
  timeout: 5000
})

if (config.get('myKeyId')) {
  if (args.i) {
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
    // list all gpg keys
    require('./components/ParticipantSelect')
  }
} else {
// show key selection screen
}
