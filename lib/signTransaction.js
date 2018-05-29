const ServiceBase = require('./base')
const EthereumTx = require('ethereumjs-tx')

const constraints = {
  rawTx: {
    presence: { allowEmpty: false }
  },
  privateKey: {
    presence: { allowEmpty: false },
    validateECDSAPrivateKey: true
  }
}

module.exports = class MobileRegistration extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    const tx = new EthereumTx(this.rawTx)
    tx.sign(Buffer.from(this.privateKey, 'hex'))
    return { signedTransaction: `0x${tx.serialize().toString('hex')}` }
  }
}
