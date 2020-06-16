const ServiceBase = require('./base')
const crypto = require('crypto')

const constraints = {
  secret: {
    presence: { allowEmpty: false }
  },
  encryptedKey: {
    presence: { allowEmpty: false }
  }
}

module.exports = class DecryptPrivateKey extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    return new Promise((resolve, reject) => {
      const shaSum = crypto.createHash('sha256')
      shaSum.update(this.secret)
      const secret = shaSum.digest('hex')

      const decrypt = crypto.createDecipher(
        'aes-256-ctr',
        Buffer.from(secret, 'hex')
      )
      decrypt.setAutoPadding(false)
      try {
        let decryptedData = decrypt.update(this.encryptedKey, 'hex', 'utf8')
        decryptedData += decrypt.final('utf8')
        resolve({ decryptedKey: decryptedData })
        resolve(decryptedData)
      } catch (error) {
        reject(error)
      }
    })
  }
}
