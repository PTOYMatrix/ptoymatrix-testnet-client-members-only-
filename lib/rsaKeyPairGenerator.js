const ServiceBase = require('./base')
const NodeRSA = require('node-rsa')

module.exports = class RSAKeyPairGenerator extends ServiceBase {
  async run () {
    const key = NodeRSA()
    key.generateKeyPair()
    const privateKey = key.exportKey('pkcs8-private-pem')
    return {
      nonHexPrivateKey: privateKey,
      privateKey: Buffer.from(privateKey).toString('hex'),
      publicKey: Buffer.from(key.exportKey('pkcs8-public-pem')).toString('hex')
    }
  }
}
