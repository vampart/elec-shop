import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
  CognitoUserAttribute,
} from 'amazon-cognito-identity-js';
import awsConfig from '../config/aws';

const userPool = new CognitoUserPool({
  UserPoolId: awsConfig.cognito.userPoolId,
  ClientId: awsConfig.cognito.userPoolWebClientId,
});

// Sign up a new user
export const signUp = (email, password, name) => {
  return new Promise((resolve, reject) => {
    const attributes = [
      new CognitoUserAttribute({ Name: 'email', Value: email }),
      new CognitoUserAttribute({ Name: 'name', Value: name }),
    ];

    userPool.signUp(email, password, attributes, null, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result.user);
    });
  });
};

// Confirm sign up with verification code
export const confirmSignUp = (email, code) => {
  return new Promise((resolve, reject) => {
    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    cognitoUser.confirmRegistration(code, true, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

// Sign in
export const signIn = (email, password) => {
  return new Promise((resolve, reject) => {
    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    cognitoUser.authenticateUser(authDetails, {
      onSuccess: (result) => {
        resolve({
          idToken: result.getIdToken().getJwtToken(),
          accessToken: result.getAccessToken().getJwtToken(),
          refreshToken: result.getRefreshToken().getToken(),
        });
      },
      onFailure: (err) => {
        reject(err);
      },
    });
  });
};

// Sign out
export const signOut = () => {
  const currentUser = userPool.getCurrentUser();
  if (currentUser) {
    currentUser.signOut();
  }
};

// Get current authenticated user
export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const currentUser = userPool.getCurrentUser();
    if (!currentUser) {
      resolve(null);
      return;
    }

    currentUser.getSession((err, session) => {
      if (err) {
        reject(err);
        return;
      }

      currentUser.getUserAttributes((err, attributes) => {
        if (err) {
          reject(err);
          return;
        }

        const userData = {};
        attributes.forEach((attr) => {
          userData[attr.getName()] = attr.getValue();
        });

        resolve({
          ...userData,
          username: currentUser.getUsername(),
          idToken: session.getIdToken().getJwtToken(),
        });
      });
    });
  });
};

// Get current session token
export const getToken = () => {
  return new Promise((resolve, reject) => {
    const currentUser = userPool.getCurrentUser();
    if (!currentUser) {
      resolve(null);
      return;
    }

    currentUser.getSession((err, session) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(session.getIdToken().getJwtToken());
    });
  });
};
