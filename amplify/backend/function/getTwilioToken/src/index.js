/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	TWILIO_ACCOUNT_SID
	TWILIO_AUTH_TOKEN
	TWILIO_API_KEY
	TWILIO_API_SECRET
	TWILIO_CHAT_SERVICE_SID
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  const AccessToken = require('twilio').jwt.AccessToken;
  const ChatGrant = AccessToken.ChatGrant;

  // Used when generating any kind of tokens
  // To set up environmental variables, see http://twil.io/secure
  const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
  const twilioApiKey = process.env.TWILIO_API_KEY;
  const twilioApiSecret = process.env.TWILIO_API_SECRET;

  // Used specifically for creating Chat tokens
  const serviceSid = process.env.TWILIO_CHAT_SERVICE_SID;
  const identity = event.queryStringParameters.identity;

  const chatGrant = new ChatGrant({
    serviceSid: serviceSid,
  });

  // Create an access token which we will sign and return to the client,
  // containing the grant we just created
  const token = new AccessToken(
    twilioAccountSid,
    twilioApiKey,
    twilioApiSecret,
    { identity: identity }
  );

  token.addGrant(chatGrant);

  return {
    statusCode: 200,
    //  Uncomment below to enable CORS requests
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
    },
    body: token.toJwt(),
  };
};
