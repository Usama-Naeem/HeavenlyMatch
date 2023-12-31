export type AmplifyDependentResourcesAttributes = {
  "api": {
    "heavenlymatch": {
      "GraphQLAPIEndpointOutput": "string",
      "GraphQLAPIIdOutput": "string",
      "GraphQLAPIKeyOutput": "string"
    },
    "moderationNotifier": {
      "ApiId": "string",
      "ApiName": "string",
      "RootUrl": "string"
    },
    "notifications": {
      "ApiId": "string",
      "ApiName": "string",
      "RootUrl": "string"
    },
    "stripePayments": {
      "ApiId": "string",
      "ApiName": "string",
      "RootUrl": "string"
    },
    "twilio": {
      "ApiId": "string",
      "ApiName": "string",
      "RootUrl": "string"
    }
  },
  "auth": {
    "heavenlymatchwebcaf42ae7": {
      "AppClientID": "string",
      "AppClientIDWeb": "string",
      "CreatedSNSRole": "string",
      "IdentityPoolId": "string",
      "IdentityPoolName": "string",
      "UserPoolArn": "string",
      "UserPoolId": "string",
      "UserPoolName": "string"
    },
    "userPoolGroups": {
      "candidateGroupRole": "string",
      "superadminGroupRole": "string",
      "volunteerGroupRole": "string"
    }
  },
  "function": {
    "getTwilioToken": {
      "Arn": "string",
      "LambdaExecutionRole": "string",
      "LambdaExecutionRoleArn": "string",
      "Name": "string",
      "Region": "string"
    },
    "handleNotifications": {
      "Arn": "string",
      "LambdaExecutionRole": "string",
      "LambdaExecutionRoleArn": "string",
      "Name": "string",
      "Region": "string"
    },
    "heavenlymatchwebcaf42ae7CreateAuthChallenge": {
      "Arn": "string",
      "LambdaExecutionRole": "string",
      "LambdaExecutionRoleArn": "string",
      "Name": "string",
      "Region": "string"
    },
    "heavenlymatchwebcaf42ae7DefineAuthChallenge": {
      "Arn": "string",
      "LambdaExecutionRole": "string",
      "LambdaExecutionRoleArn": "string",
      "Name": "string",
      "Region": "string"
    },
    "heavenlymatchwebcaf42ae7VerifyAuthChallengeResponse": {
      "Arn": "string",
      "LambdaExecutionRole": "string",
      "LambdaExecutionRoleArn": "string",
      "Name": "string",
      "Region": "string"
    },
    "moderationNotifierHM": {
      "Arn": "string",
      "LambdaExecutionRole": "string",
      "LambdaExecutionRoleArn": "string",
      "Name": "string",
      "Region": "string"
    },
    "stripePayments": {
      "Arn": "string",
      "LambdaExecutionRole": "string",
      "LambdaExecutionRoleArn": "string",
      "Name": "string",
      "Region": "string"
    }
  },
  "storage": {
    "heavenlyMatchStorage": {
      "BucketName": "string",
      "Region": "string"
    }
  }
}