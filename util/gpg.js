// execa based interface to gpg
const execa = require('execa')
const execaSync = execa.commandSync
const conf = require('conf')

// each method will fail silently and not obstruct the program
// although a log message will be issued
const encryptMessage = (message, recipientId) => {
  // should return an encrypted message
  const gpgCommand = `echo ${message} | gpg --encrypt -r ${recipientId} -a`

  let encryptedMessage
  try {
    encryptedMessage = execaSync(gpgCommand, {shell: true})
  } catch(e) {
    // log this to the logger
    console.log(e)
    return null;
  }
  return encryptedMessage.stdout
}

const decryptMessage = (message) => {
  // should return a decrypted message
  // the message was intended for my private key
  const gpgCommand = `echo ${message} | gpg --decrypt -a`
  let decryptedMessage
  try {
    decryptedMessage = execaSync(gpgCommand, {shell: true})
  } catch (e) {
    console.log(e)
    return null;
  }
  return decryptedMessage.stdout
}

const myGpgKey = () => {
  const myKeyId = conf.get(myKeyId)
  const myKey = execaSync(`gpg --export -a ${myKeyId}`).stdout
  return myKey;
}

const getPublicKey = (id) => {
}

const listRecipients = () => {
  const gpgCommand = `gpg --list-keys`
  const result = execaSync(gpgCommand).stdout
  // pull out all the email addresses
  const re = /<(\S+@\S+\.\S+)>/gim
  const matchesIterator = result.matchAll(re)
  const matches2DArray = Array.from(matchesIterator)
  const myKeysCommand = `gpg -K`
  const myKeysResult = execaSync(myKeysCommand).stdout.matchAll(re)
  const myKeysArray = Array.from(myKeysResult)
  const myKeys = myKeysArray.map(match => match[1])

  return matches2DArray.map(match => match[1])
                        .filter(key => myKeys.indexOf(key) === -1)
}

const gpg = {
  encryptMessage,
  decryptMessage,
  listRecipients,
  myGpgKey,
  getPublicKey
};

module.exports = gpg;

