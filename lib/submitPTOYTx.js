const ServiceBase = require('./base')
const requestPromise = require('request-promise')

const constraints = {
  accessToken: {
    presence: { allowEmpty: false }
  },
  signedTx: {
    presence: { allowEmpty: false }
  }
}

module.exports = class SubmitPTOYTx extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    let submitTxAPI = `${this.BASEURL}/api/v1/submitTx?provider=ethereum_main_net`

    var options = {
      method: 'POST',
      uri: submitTxAPI,
      auth: {
        'bearer': this.accessToken
      },
      body: {
        signedTx: this.signedTx
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
