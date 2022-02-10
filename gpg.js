// execa based interface to gpg
const execa = require('execa');
const execaSync = execa.commandSync;
const { $ } = require('zx');
$.verbose = false;

// each method will fail silently and not obstruct the program
// although a log message will be issued
const encryptMessage = async (message, recipientId) => {
  // should return an encrypted message
  let encryptedMessage;
  try {
    encryptedMessage =
      await $`echo ${message} | gpg --always-trust --encrypt -r ${recipientId} -a`;
  } catch (e) {
    // log this to the logger
    console.log(e);
    return null;
  }
  return encryptedMessage.stdout;
};

// should return a decrypted message
// the message was intended for my private key
const decryptMessage = async (message) => {
  let decryptedMessage;
  try {
    decryptedMessage =
      await $`echo ${message} | gpg --always-trust --decrypt -a`;
  } catch (e) {
    console.error(e);
    return null;
  }
  return decryptedMessage.stdout.trim();
};

const myGpgKey = () => {
  const re = /<(\S+@\S+\.\S+)>/gim;
  const myKeysCommand = `gpg -K`;
  let myKeysResult;
  try {
    myKeysResult = execaSync(myKeysCommand).stdout.matchAll(re);
  } catch (e) {
    console.error(e);
    return null;
  }
  const myKeysArray = Array.from(myKeysResult);
  const myKeys = myKeysArray.map((match) => match[1]);
  return getPublicKey(myKeys[0]);
};

// returns a public key for specified id
const getPublicKey = (id) => {
  const gpgCommand = `gpg --export -a ${id}`;
  let result;
  try {
    result = execaSync(gpgCommand).stdout;
  } catch (e) {
    console.log(e);
    return null;
  }
  return result;
};

// lists all the available gpg keys
const listRecipients = () => {
  const gpgCommand = `gpg --list-keys`;
  let result;
  try {
    result = execaSync(gpgCommand).stdout;
  } catch (e) {
    console.log(e);
    return null;
  }
  // pull out all the email addresses
  const re = /<(\S+@\S+\.\S+)>/gim;
  const matchesIterator = result.matchAll(re);
  const matches2DArray = Array.from(matchesIterator);
  const myKeysCommand = `gpg -K`;
  let myKeysResult;
  try {
    myKeysResult = execaSync(myKeysCommand).stdout.matchAll(re);
  } catch (e) {
    console.log(e);
    return null;
  }
  const myKeysArray = Array.from(myKeysResult);
  const myKeys = myKeysArray.map((match) => match[1]);

  return matches2DArray
    .map((match) => match[1])
    .filter((key) => myKeys.indexOf(key) === -1);
};

const gpg = {
  encryptMessage,
  decryptMessage,
  listRecipients,
  myGpgKey,
  getPublicKey,
};

module.exports = gpg;
