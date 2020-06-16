const ServiceBase = require('./base')
const requestPromise = require('request-promise')

const constraints = {
  accessToken: {
    presence: { allowEmpty: false }
  }
}

module.exports = class GetAllFiles extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    const getAllFilesAPI = `${this.BASEURL}/api/v1/user_files`

    const options = {
      rejectUnauthorized: false,
      method: 'GET',
      uri: getAllFilesAPI,
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
