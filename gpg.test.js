const gpg = require('./gpg')
// gpg tests
describe('gpg tests', () => {

  test('encryption function does not error out', async () => {
    const myString = `this is a test string`;
    // encrypting it for myself
    const encryptedString = await gpg.encryptMessage(myString,
    'navdeep@mailbox.org')
    expect(encryptedString).toBeTruthy()
  })

  test('encryption and decryption work', async () => {
    const myString = 'this is a test string';
    const encryptedString = await gpg.encryptMessage(myString,
    'navdeepone@icloud.com')
    const decryptedString = await gpg.decryptMessage(encryptedString)
    expect(decryptedString).toBe(myString)
  })

})
