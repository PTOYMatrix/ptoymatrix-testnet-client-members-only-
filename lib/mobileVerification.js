const ServiceBase = require('./base')
const requestPromise = require('request-promise')

const constraints = {
  referenceId: {
    presence: { allowEmpty: false },
    format: {
      pattern: '[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}',
      message: 'not a valid uuid'
    }
  },
  mobileOtp: {
    presence: { allowEmpty: false }
  }
}

module.exports = class MobileRegistration extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    const options = {
      rejectUnauthorized: false,
      method: 'POST',
      uri: `${this.BASEURL}/api/v1/mobile_verification`,
      body: {
        referenceId: this.referenceId,
        mobileOtp: this.mobileOtp
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
