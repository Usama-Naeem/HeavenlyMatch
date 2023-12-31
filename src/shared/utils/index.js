import { Auth } from "aws-amplify";

// this function returns the JWT token
export const getJWT = async () => {
  try {
    const userCurrentSession = await Auth.currentSession();
    const accessToken = userCurrentSession.getAccessToken();
    const JWTvalue = accessToken.getJwtToken();
    return JWTvalue;
  } catch (error) {
    throw Error(error.message);
  }
};
