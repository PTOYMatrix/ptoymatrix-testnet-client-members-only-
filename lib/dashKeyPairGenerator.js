const ServiceBase = require('./base')
const { networks, HDNode } = require('bitcoinjs-lib')
const bip39 = require('bip39')

networks.bcy = {
  messagePrefix: '\x18Bitcoin Signed Message:\n',
  bech32: 'bc',
  bip32: {
    public: 0x0488b21e,
    private: 0x0488ade4
  },
  pubKeyHash: 0x1b,
  scriptHash: 0x1f,
  wif: 0x49
}

const constraints = {
  mnemonic: {
    presence: { allowEmpty: false },
    validateMnemonic: true
  }
}

module.exports = class DashKeyPairGenerator extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    const seed = bip39.mnemonicToSeed(this.mnemonic)
    const parent = HDNode.fromSeedBuffer(seed, networks.bcy)
    const child = parent.derivePath('m/1')
    const privKeyBuffer = child.keyPair.d.toBuffer(32)
    const privkey = privKeyBuffer.toString('hex')

    return {
      wif: child.keyPair.toWIF(),
      address: child.getAddress(),
      publicKey: child.keyPair.getPublicKeyBuffer().toString('hex'),
      privateKey: privkey
    }
  }
}
