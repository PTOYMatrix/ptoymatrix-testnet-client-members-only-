const ServiceBase = require('./base')
const crypto = require('crypto')
const NodeRSA = require('node-rsa')
const fs = require('fs')

const constraints = {
  encryptedFilePath: {
    presence: { allowEmpty: false }
  },
  rsaPrivateKey: {
    presence: { allowEmpty: false }
  },
  secrets: {
    presence: { allowEmpty: false }
  },
  decryptedFilePath: {
    presence: { allowEmpty: false }
  }
}

module.exports = class DataEncryption extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    if (!fs.existsSync(this.encryptedFilePath)) {
      this.addError('encryptedFilePath', 'File is not found')
      return
    }
    const secrets = DataEncryption._decryptSecretKeyRSA(
      this.secrets,
      this.rsaPrivateKey
    )
    return {
      decryptedFilePath: await DataEncryption._decryption(
        this.encryptedFilePath,
        secrets,
        this.decryptedFilePath
      ),
      decryptedSecretKey: secrets
    }
  }

  static async _decryption (encryptedFilePath, secrets, decryptedFilePath) {
    return new Promise(function (resolve, reject) {
      // input file
      const readStream = fs.createReadStream(encryptedFilePath)
      const writeStream = fs.createWriteStream(decryptedFilePath)
      const decrypt = crypto.createDecipheriv(
        secrets.alogorithm,
        Buffer.from(secrets.secretKey, 'hex'),
        Buffer.from(secrets.iV, 'hex')
      )
      decrypt.setAutoPadding(secrets.padding)
      try {
        readStream.pipe(decrypt).pipe(writeStream)
        writeStream.on('finish', () => {
          resolve(writeStream.path)
        })
      } catch (error) {
        reject(error)
      }
    })
  }

  static _decryptSecretKeyRSA (secretKey, rsaPrivateKey) {
    const key = NodeRSA()
    key.importKey(rsaPrivateKey)
    const decrypteSecretKey = key.decrypt(Buffer.from(secretKey, 'hex'), 'json')
    return decrypteSecretKey
  }
}
