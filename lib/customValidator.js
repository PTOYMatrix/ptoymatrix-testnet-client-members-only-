const validate = require('validate.js')
const Wallet = require('ethereumjs-wallet')
const bip39 = require('bip39')

var validators = {}

validators.validateECDSAPrivateKey = (value, options, key, attributes) => {
  try {
    Wallet.fromPrivateKey(Buffer.from(value, 'hex'))
  } catch (error) {
    return 'is invalid'
  }
}

validators.validateMnemonic = (value, options, key, attributes) => {
  try {
    if (!bip39.validateMnemonic(value)) {
      return 'is invalid'
    }
  } catch (error) {
    return error.message
  }
}

Object.assign(validate.validators, validators)

module.exports = validate
