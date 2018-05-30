const ServiceBase = require('./base')
const requestPromise = require('request-promise')

const constraints = {
  accessToken: {
    presence: { allowEmpty: false }
  },
  toAddress: {
    presence: { allowEmpty: false }
  },
  value: {
    presence: { allowEmpty: false },
    numericality: {
      greaterThan: 0
    }
  }
}

module.exports = class SubmitTx extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    let transferPTOYAPI = `${this.BASEURL}/api/v1/raw_transactions/transferPTOY`

    const options = {
      rejectUnauthorized: false,
      method: 'POST',
      uri: transferPTOYAPI,
      body: {
        toAddress: this.toAddress,
        value: this.value
      },
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
