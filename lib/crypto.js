const ServiceBase = require('./base')
const NodeRSA = require('node-rsa')
const crypto = require('crypto')

const AES_ALGORITHM = 'aes-256-cbc'

const constraints = {
  secretKey: {
    presence: { allowEmpty: false }
  },
  dataString: {
    presence: { allowEmpty: false }
  },
  operation: {
    presence: { allowEmpty: false },
    inclusion: ['decryptRSA', 'encryptAES', 'decryptAES']
  }
}

module.exports = class Crypto extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    switch (this.operation) {
      case 'decryptRSA':
        return Crypto.DecryptRSA(this.dataString, this.secretKey)
      case 'encryptAES':
        return Crypto.EncryptAES(this.dataString, this.secretKey)
      case 'decryptAES':
        return Crypto.DecryptRSA(this.dataString, this.secretKey)
      default:
        break
    }
  }

  static DecryptRSA (encryptedDataString, rsaPrivateKey) {
    const key = NodeRSA()
    key.importKey(rsaPrivateKey)

    const decrypteDataString = key.decrypt(
      Buffer.from(encryptedDataString, 'hex'),
      'json'
    )
    return decrypteDataString
  }

  static EncryptAES (dataString, secretKey) {
    const cipher = crypto.createCipher(AES_ALGORITHM, secretKey)
    var cryptedData = cipher.update(dataString, 'utf8', 'hex')
    cryptedData += cipher.final('hex')
    return cryptedData
  }

  static DecryptAES (encryptedDataString, secretKey) {
    const decipher = crypto.createDecipher(AES_ALGORITHM, secretKey)
    var decryptedData = decipher.update(encryptedDataString, 'hex', 'utf8')
    decryptedData += decipher.final('utf8')
    return decryptedData
  }
}
