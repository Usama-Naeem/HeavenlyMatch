/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

/* Amplify Params - DO NOT EDIT
	API_HEAVENLYMATCH_GRAPHQLAPIIDOUTPUT
	API_HEAVENLYMATCH_HEAVENLYMATCHADMINTABLE_ARN
	API_HEAVENLYMATCH_HEAVENLYMATCHADMINTABLE_NAME
	ENV
  SES_PUBLIC_KEY
  SES_SECRET_KEY
  SES_SENDER_EMAIL
  HOST_URL
	REGION
Amplify Params - DO NOT EDIT */
const express = require('express');
const bodyParser = require('body-parser');
const AWS = require('aws-sdk');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
const docClient = new AWS.DynamoDB.DocumentClient();
const {
  SESClient,
  SendBulkTemplatedEmailCommand,
} = require('@aws-sdk/client-ses');

const adminHeavenlyMatch =
  process.env.API_HEAVENLYMATCH_HEAVENLYMATCHADMINTABLE_NAME;
const hostUrl = process.env.HOST_URL;
const senderEmail = process.env.SES_SENDER_EMAIL;
// declare a new express app
const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

const client = new SESClient({
  credentials: {
    accessKeyId: process.env.SES_PUBLIC_KEY,
    secretAccessKey: process.env.SES_SECRET_KEY,
  },
  region: 'us-east-1',
});

app.post('/sendEmailNotification', async function (req, res) {
  try {
    const adminEmails = await getAdminRecords();
    if (req?.body?.action === 'newBio') {
      await sendEmail(
        req?.body?.name,
        req?.body?.email,
        adminEmails?.Items,
        hostUrl,
        'newBio'
      );
    } else if (req?.body?.action === 'newImage') {
      await sendEmail(
        req?.body?.name,
        req?.body?.email,
        adminEmails?.Items,
        hostUrl,
        'newImage'
      );
    } else if (req?.body?.action === 'reportUser')
      await sendEmail(
        req?.body?.name,
        req?.body?.email,
        adminEmails?.Items,
        hostUrl,
        'reportUser',
        req?.body?.reportedBy
      );
    else
      await sendEmail(
        req?.body?.name,
        req?.body?.email,
        adminEmails?.Items,
        hostUrl,
        'newProfile'
      );
  } catch (error) {}
  res.json({ success: 'post call succeed!', url: req.url, body: req.body });
});

const getAdminRecords = async () => {
  const superAdmin = 'superadmin';
  try {
    const query = await docClient
      .scan({
        TableName: adminHeavenlyMatch,
        FilterExpression: '#role = :role',
        ExpressionAttributeNames: {
          '#role': 'role',
        },
        ExpressionAttributeValues: {
          ':role': superAdmin,
        },
      })
      .promise();
    return query;
  } catch (e) {
    throw Error(e.message);
  }
};

const sendEmail = async (
  name,
  email,
  adminEmails,
  hostUrl,
  type,
  reportedBy
) => {
  const chunkedUsers = chunkArray(adminEmails, 50);

  const responses = [];
  for (const chunk of chunkedUsers) {
    const input = {
      Destinations: chunk.map((user) => ({
        Destination: { ToAddresses: [user.email] },
      })),
      Source: senderEmail,
      Template:
        type === 'newBio'
          ? 'HEAVENLYMATCH_UPDATE_BIO_TEMPLATE'
          : type === 'newImage'
          ? 'HEAVENLYMATCH_UPDATE_IMAGE_TEMPLATE'
          : type === 'reportUser'
          ? 'HEAVENLYMATCH_REPORT_AND_BLOCK_USER_TEMPLATE'
          : 'HEAVENLYMATCH_NEW_USER_TEMPLATE',
      DefaultTemplateData:
        type === 'reportUser'
          ? JSON.stringify({
              name: `${name}`,
              email: `${email}`,
              link: `${hostUrl}`,
              reportedBy: `${reportedBy}`,
            })
          : JSON.stringify({
              name: `${name}`,
              email: `${email}`,
              link: `${hostUrl}`,
            }),
    };
    const command = new SendBulkTemplatedEmailCommand(input);
    try {
      const response = await client.send(command);
      responses.push(response);
    } catch (err) {
      throw Error(err.message);
    }
  }
  return responses;
};

// Helper function to split the array into chunks
const chunkArray = (array, chunkSize) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
};

app.listen(3000, function () {
  console.log('App started');
});

module.exports = app;
