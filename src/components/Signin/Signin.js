import {
  View,
  Image,
  Heading,
  Flex,
  Link,
  useAuthenticator,
  useTheme,
} from '@aws-amplify/ui-react';
import logo from '../../assets/logo.png';

export const components = {
  Header() {
    const { tokens } = useTheme();

    return (
      <View textAlign="center">
        <Image alt="logo" src={`${logo}`} padding={tokens.space.medium} />
      </View>
    );
  },

  Footer() {
    const { tokens } = useTheme();

    return <Flex justifyContent="center" padding={tokens.space.medium}></Flex>;
  },
  SignIn: {
    Header() {
      const { tokens } = useTheme();

      return (
        <Heading
          level={3}
          padding={`${tokens.space.xl} ${tokens.space.xl} 0`}
          color={'#FFFFFF'}
        >
          Login
        </Heading>
      );
    },
    Footer() {
      const { toResetPassword } = useAuthenticator();
      const { tokens } = useTheme();

      return (
        <Flex justifyContent="center" padding={`0 0 ${tokens.space.medium}`}>
          <Link onClick={toResetPassword}>Forgot password</Link>
        </Flex>
      );
    },
  },
};

export const formFields = {
  signIn: {
    username: {
      placeholder: 'Email',
      labelHidden: true,
    },
    password: {
      placeholder: 'Password',
      labelHidden: true,
    },
  },
};
