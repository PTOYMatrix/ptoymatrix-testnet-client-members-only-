const ServiceBase = require('./base')
const util = require('ethereumjs-util')
const crypto = require('crypto')

const constraints = {
  privateKey: {
    presence: { allowEmpty: false },
    validateECDSAPrivateKey: true
  },
  messageString: {
    presence: { allowEmpty: false }
  }
}

module.exports = class CreateSignatureECDSA extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    const privateKeyBuffer = Buffer.from(this.privateKey, 'hex')
    const messageHash = crypto
      .createHash('sha256')
      .update(this.messageString)
      .digest()
    const sign = util.ecsign(messageHash, privateKeyBuffer)

    return {
      ecdsaSignature: `${sign.r.toString('hex')}${sign.s.toString('hex')}${
        sign.v
      }`
    }
  }
}
