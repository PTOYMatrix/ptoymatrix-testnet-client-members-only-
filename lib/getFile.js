const ServiceBase = require('./base')
const requestPromise = require('request-promise')
const fs = require('fs')

const constraints = {
  accessToken: {
    presence: { allowEmpty: false }
  },
  fileLink: {
    presence: { allowEmpty: false }
  },
  fileName: {
    presence: { allowEmpty: false }
  }
}

module.exports = class GetFile extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    let getFileAPI = `${this.BASEURL}${this.fileLink}`

    const options = {
      rejectUnauthorized: false,
      method: 'GET',
      uri: getFileAPI,
      auth: {
        'bearer': this.accessToken
      },
      resolveWithFullResponse: true,
      encoding: null
    }

    return new Promise(async (resolve, reject) => {
      try {
        const result = await requestPromise(options)
        const writeStream = fs.createWriteStream(`${this.fileName}`)
        writeStream.write(result.body)
        writeStream.end()
        writeStream.on('finish', () => { resolve({ encryptedFilePath: writeStream.path }) })
      } catch (error) {
        reject(error)
      }
    })
  }
}
