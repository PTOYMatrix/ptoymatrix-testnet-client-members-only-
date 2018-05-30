const ServiceBase = require('./base')
const requestPromise = require('request-promise')

module.exports = class HealthCheck extends ServiceBase {
  async run () {
    let getBalanceAPI = `${this.BASEURL}/healthcheck`

    const options = {
      rejectUnauthorized: false,
      method: 'GET',
      uri: getBalanceAPI,
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
