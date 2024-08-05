const accountSid = 'AC6b4155bf5fdb5a4e16745c3d08dbe189';
const authToken = '1e0daecb6595728cca88c0c872a861d6';
const serviceid = 'VA2978a2b9dd4026f6ee7156e9b1adeb37';

const client = require('twilio')(accountSid, authToken, {
    lazyLoading : true
});


const sendOTP = async (req, res, next) => {

    const { countrycode, mobileNumber } = req.body;
    try {
        
        const otpResponse = await client.verify
        .services(serviceid)
        .verifications.create({
            to: `+${countrycode}${mobileNumber}`, // Your phone number
            channel: 'sms'
        })

        res.status(200).send(`OTP send Sucessfully : ${JSON.stringify(otpResponse)}`)

    } catch (error) {
        res.status(error?.status || 400).send(error?.message || 'something went wrong!');
    }
}


const verifyOTP = async (req, res, next) => {
    const { countrycode, mobileNumber, otp } = req.body;

    try {
        const verificationsResponse = await client.verify
        .services(serviceid)
        .verificationChecks.create({
            to: `+${countrycode}${mobileNumber}`, // Your phone number
            code: otp,
        })

        res.status(200).send(`OTP verified Sucessfully : ${JSON.stringify(verificationsResponse)}`)
    } catch (error) {
        res.status(error?.status || 400).send(error?.message || 'something went wrong!');
    }

}


module.exports = {
    sendOTP,
    verifyOTP
}