const ServiceBase = require('./base')
const requestPromise = require('request-promise')

const constraints = {
  mobile: {
    presence: { allowEmpty: false },
    numericality: true,
    length: {
      is: 10,
      message: 'Number invalid'
    }
  },
  mobileCountry: {
    presence: { allowEmpty: false },
    format: {
      pattern: /^\+\d{1,3}$/,
      message: 'code is invalid'
    }
  }
}

module.exports = class MobileRegistration extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    var options = {
      method: 'POST',
      uri: `${this.BASEURL}/api/v1/mobile_registration`,
      body: {
        mobileCountry: this.mobileCountry,
        mobile: this.mobile
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
