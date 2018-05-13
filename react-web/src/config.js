const dev = {
  STRIPE_KEY: "pk_test_v1amvR35uoCNduJfkqGB8RLD",
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://di7nan8s01.execute-api.us-east-1.amazonaws.com/Prod"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_f7f94AC0F",
    APP_CLIENT_ID: "6u3ukkptov5uksoklarhcmsul8",
    IDENTITY_POOL_ID: "us-east-1:8a592fb0-5fd7-400f-9ccc-ab5be2638256"
  }
};

const prod = {
  STRIPE_KEY: "pk_test_v1amvR35uoCNduJfkqGB8RLD",
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://di7nan8s01.execute-api.us-east-1.amazonaws.com/Prod"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_f7f94AC0F",
    APP_CLIENT_ID: "6u3ukkptov5uksoklarhcmsul8",
    IDENTITY_POOL_ID: "us-east-1:8a592fb0-5fd7-400f-9ccc-ab5be2638256"
  }
};

// Default to dev if not set
const config = process.env.REACT_APP_STAGE === 'prod'
  ? prod
  : dev;

export default {
  // Add common config values here
  MAX_ATTACHMENT_SIZE: 5000000,
  ...config
};
