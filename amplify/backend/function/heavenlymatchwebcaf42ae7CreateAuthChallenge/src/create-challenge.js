/**
 * @type {import('@types/aws-lambda').CreateAuthChallengeTriggerHandler}
 */

const sms = require('/opt/nodejs/sms');
const email = require('/opt/nodejs/email');

function betweenRandomNumber(min, max) {
    return Math.floor(
        Math.random() * (max - min + 1) + min
    )
}

async function createAuthChallenge(event) {
    if (event.request.challengeName === 'CUSTOM_CHALLENGE') {
        // Generate a random code for the custom challenge
        const randomDigits = betweenRandomNumber(100000, 999999);
        const challengeCode = String(randomDigits);

        event.response.privateChallengeParameters = {};

        if (event.request.userAttributes.phone_number){
            await sms.sendSMS(`Enter code ${challengeCode} to log in to Heavenly Match`,event.request.userAttributes.phone_number)
        }

        if (event.request.userAttributes.email){
            await email.sendChallengeEmail(event.request.userAttributes.email, event.request.userAttributes.name || "User", challengeCode)
        }

        event.response.publicChallengeParameters = {
            email: event.request.userAttributes.email || null,
            phone: event.request.userAttributes.phone_number || null
        }

        // Add the secret login code to the private challenge parameters,
        // so it can be verified by the "Verify Auth Challenge Response"
        event.response.privateChallengeParameters = {answer: challengeCode}
        // Add the secret login code to the session, so it is available
        event.response.challengeMetadata = `CODE-${challengeCode}`
    }
    return event;


}

exports.handler = async (event) => {
    return createAuthChallenge(event);
};
