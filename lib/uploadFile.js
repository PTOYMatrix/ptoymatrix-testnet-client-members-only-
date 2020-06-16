const ServiceBase = require('./base')
const requestPromise = require('request-promise')
const fs = require('fs')

const constraints = {
  accessToken: {
    presence: { allowEmpty: false }
  },
  filePath: {
    presence: { allowEmpty: false }
  },
  fileName: {
    presence: { allowEmpty: false }
  }
}

module.exports = class SubmitTx extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    const uploadFileAPI = `${this.BASEURL}/api/v1/user_file`
    if (!fs.existsSync(this.filePath)) {
      this.addError('filePath', 'File is not found')
      return
    }
    const options = {
      rejectUnauthorized: false,
      method: 'POST',
      uri: uploadFileAPI,
      formData: {
        file: {
          value: fs.createReadStream(this.filePath),
          options: {
            filename: this.fileName,
            contentType: 'application/octet-stream'
          }
        },
        fileName: this.fileName
      },
      auth: {
        bearer: this.accessToken
      },
      json: true // Automatically stringifies the body to JSON
    }

    try {
      const apiResult = await requestPromise(options)
      return apiResult.result
    } catch (error) {
      throw error.error
    }
  }
}
