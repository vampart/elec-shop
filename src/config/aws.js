// AWS Configuration for Elec Shop
// Replace these values with your actual AWS resource IDs after deployment

const awsConfig = {
  // Amazon Cognito
  cognito: {
    region: process.env.REACT_APP_AWS_REGION || 'us-east-1',
    userPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID || 'us-east-1_XXXXXXXXX',
    userPoolWebClientId: process.env.REACT_APP_COGNITO_CLIENT_ID || 'xxxxxxxxxxxxxxxxxxxxxxxxxx',
  },

  // API Gateway
  apiGateway: {
    region: process.env.REACT_APP_AWS_REGION || 'us-east-1',
    endpoint: process.env.REACT_APP_API_ENDPOINT || 'https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/prod',
  },

  // Stripe (test mode)
  stripe: {
    publishableKey: process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || 'pk_test_XXXXXXXXXXXXXXXXXXXXXXXX',
  },
};

export default awsConfig;
