const ServiceBase = require('./base')
const NodeRSA = require('node-rsa')

module.exports = class RSAKeyPairGenerator extends ServiceBase {
  async run () {
    const key = NodeRSA()
    key.generateKeyPair()
    return {
      privateKey: Buffer.from(key.exportKey('pkcs8-private-pem')).toString('hex'),
      publicKey: Buffer.from(key.exportKey('pkcs8-public-pem')).toString('hex')
    }
  }
}
