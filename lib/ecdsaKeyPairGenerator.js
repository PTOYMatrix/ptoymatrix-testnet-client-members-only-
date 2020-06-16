const ServiceBase = require('./base')
const hdWallet = require('ethereumjs-wallet/hdkey')
const bip39 = require('bip39')

const constraints = {
  mnemonic: {
    presence: { allowEmpty: false },
    validateMnemonic: true
  }
}

module.exports = class EcdsaKeyPairGenerator extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    const seed = bip39.mnemonicToSeed(this.mnemonic)
    const HDKey = hdWallet.fromMasterSeed(seed)
    const wallet = HDKey.getWallet()

    return {
      privateKey: wallet.getPrivateKey().toString('hex'),
      publicKey: wallet.getPublicKey().toString('hex'),
      address: wallet.getAddressString()
    }
  }
}
