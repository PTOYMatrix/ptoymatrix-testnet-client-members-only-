const ServiceBase = require('./base')
const requestPromise = require('request-promise')

const constraints = {
  accessToken: {
    presence: { allowEmpty: false }
  }
}

module.exports = class GetUserProfile extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    let getUserProfileAPI = `${this.BASEURL}/api/v1/user`

    const options = {
      method: 'GET',
      uri: getUserProfileAPI,
      auth: {
        'bearer': this.accessToken
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
