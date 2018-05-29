const ServiceBase = require('./base')
const crypto = require('crypto')

const constraints = {
  secret: {
    presence: { allowEmpty: false }
  },
  key: {
    presence: { allowEmpty: false }
  }
}

module.exports = class EncryptPrivateKey extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    return new Promise((resolve, reject) => {
      const shaSum = crypto.createHash('sha256')
      shaSum.update(this.secret)
      const secret = shaSum.digest('hex')

      const encrypt = crypto.createCipher('aes-256-ctr', Buffer.from(secret, 'hex'))
      encrypt.setAutoPadding(false)
      try {
        let encryptedData = encrypt.update(this.key, 'utf8', 'hex')
        encryptedData += encrypt.final('hex')
        resolve({ encryptedKey: encryptedData })
      } catch (error) { reject(error) }
    })
  }
}
