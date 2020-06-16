const ServiceBase = require('./base')
const requestPromise = require('request-promise')

const constraints = {
  accessToken: {
    presence: { allowEmpty: false }
  }
}

module.exports = class GetBalance extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    const getBalanceAPI = `${this.BASEURL}/api/v1/user/get_balances`

    const options = {
      rejectUnauthorized: false,
      method: 'GET',
      uri: getBalanceAPI,
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
