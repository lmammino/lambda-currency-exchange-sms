const request = require('request-promise-native')

const handler = (event, context, callback) => {
  const { CURRENCY_FROM, CURRENCY_TO, TWILIO_ACCOUNT, TWILIO_API_KEY, SEND_SMS_FROM, SEND_SMS_TO } = process.env

  // get the requested currency exchange using fixer.io API
  request.get({
    url: `http://api.fixer.io/latest?symbols=${CURRENCY_TO}&base=${CURRENCY_FROM}`,
    json: true
  })
    .then((data) => {
      const rate = data.rates[CURRENCY_TO]
      console.log(`Fetched exchange rate for ${CURRENCY_FROM} -> ${CURRENCY_TO}`, rate)

      // send sms with current exchange rate
      return request.post({
        url: `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT}/Messages.json`,
        json: true,
        'auth': {
          'user': TWILIO_ACCOUNT,
          'pass': TWILIO_API_KEY
        },
        form: {
          From: SEND_SMS_FROM,
          To: SEND_SMS_TO,
          Body: `Today you get ${rate} ${CURRENCY_TO} for 1 ${CURRENCY_FROM}`
        }
      })
    })
    .then((data) => {
      console.log(`Rate successfully sent through SMS to ${SEND_SMS_TO}`)
      return callback(null, true)
    })
    .catch((err) => {
      console.error(err)
      return callback(err)
    })
}

module.exports = { handler }
