/**
 * @type {import('@types/aws-lambda').DefineAuthChallengeTriggerHandler}
 */
exports.handler = async function (event) {
  if(event.request.session && event.request.session.slice(-1)[0].challengeName === 'SRP_A'){
      event.response.issueTokens = false;
      event.response.failAuthentication = false;
      event.response.challengeName = 'PASSWORD_VERIFIER';
  } else if (event.request.session && event.request.session.slice(-1)[0].challengeName === 'PASSWORD_VERIFIER' && event.request.session.slice(-1)[0].challengeResult == true){
      event.response.issueTokens = false;
      event.response.failAuthentication = false;
      event.response.challengeName = 'CUSTOM_CHALLENGE';
  } else if (
    event.request.session &&
    event.request.session.slice(-1)[0].challengeName == "CUSTOM_CHALLENGE" &&
    event.request.session.slice(-1)[0].challengeResult == false
  ) {
    event.response.issueTokens = false;
    event.response.failAuthentication = false;
    event.response.challengeName = "CUSTOM_CHALLENGE";
  }
  
  else if (event.request.session && event.request.session.slice(-1)[0].challengeName === 'CUSTOM_CHALLENGE'
  && event.request.session.slice(-1)[0].challengeResult == true
  ){
      event.response.issueTokens = true;
      event.response.failAuthentication = false
  } else {
      event.response.issueTokens = false;
      event.response.failAuthentication = true;
  }

  return event
};