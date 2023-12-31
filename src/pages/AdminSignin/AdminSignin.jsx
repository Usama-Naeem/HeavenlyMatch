import React, { useContext } from 'react';
import { Authenticator, Flex, Grid, View } from '@aws-amplify/ui-react';
import { Navigate } from 'react-router-dom';
import image from '../../assets/mainbackground.png';
import { components, formFields } from '../../components/Signin/Signin';
import { CANDIDATE_MANAGEMENT } from '../../shared/routes';
import AuthContext from '../../shared/context/AuthContext';

export default function AdminSignin() {
  const authContext = useContext(AuthContext);
  return (
    <div
      style={{ backgroundImage: `url(${image})`, backgroundRepeat: 'round' }}
    >
      <Grid templateColumns={{ base: '1fr 0', medium: '1fr 1fr' }}>
        <div className="signin-backgroud">
          <Flex justifyContent="center" backgroundColor={'transparent'}>
            <Authenticator
              formFields={formFields}
              components={components}
              hideSignUp={true}
            >
              {({ signOut, user }) => {
                const userGroups =
                  user.signInUserSession?.idToken?.payload['cognito:groups'];
                localStorage.setItem('userGroup', JSON.stringify(userGroups));
                authContext.setUserGroupHandler(userGroups);
                authContext.setUserDataHandler(user);
                return <Navigate to={CANDIDATE_MANAGEMENT} />;
              }}
            </Authenticator>
          </Flex>
        </div>
        <View height="100vh"></View>
      </Grid>
    </div>
  );
}
