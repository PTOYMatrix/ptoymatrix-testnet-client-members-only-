const ServiceBase = require('./base')
const NodeRSA = require('node-rsa')

const constraints = {
  privateKey: {
    presence: { allowEmpty: false }
  },
  messageString: {
    presence: { allowEmpty: false }
  }
}

module.exports = class CreateSignatureRSA extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    const key = NodeRSA()
    key.importKey(this.privateKey)
    return { rsaSignature: key.sign(this.messageString, 'hex') }
  }
}
