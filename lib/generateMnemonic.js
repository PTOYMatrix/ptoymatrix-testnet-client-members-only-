const ServiceBase = require('./base')
const bip39 = require('bip39')

module.exports = class GenerateMnemonic extends ServiceBase {
  async run () {
    return { mnemonic: bip39.generateMnemonic() }
  }
}
