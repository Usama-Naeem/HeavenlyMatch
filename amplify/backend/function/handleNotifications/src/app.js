/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

/* Amplify Params - DO NOT EDIT
	API_HEAVENLYMATCH_GRAPHQLAPIIDOUTPUT
	API_HEAVENLYMATCH_HEAVENLYMATCHFCMTOKENTABLE_ARN
	API_HEAVENLYMATCH_HEAVENLYMATCHFCMTOKENTABLE_NAME
	API_HEAVENLYMATCH_HEAVENLYMATCHNOTIFICATIONTABLE_ARN
	API_HEAVENLYMATCH_HEAVENLYMATCHNOTIFICATIONTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const express = require('express');
const bodyParser = require('body-parser');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
const AWS = require('aws-sdk');
const { uuid } = require('uuidv4');
AWS.config.update({ region: 'us-east-1' });
const docClient = new AWS.DynamoDB.DocumentClient();
const notificationsTable =
  process.env.API_HEAVENLYMATCH_HEAVENLYMATCHNOTIFICATIONTABLE_NAME;
const fcmTokensTable =
  process.env.API_HEAVENLYMATCH_HEAVENLYMATCHFCMTOKENTABLE_NAME;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

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

app.post('/fcmToken', async function (req, res) {
  try {
    const { token, userId } = req.body;
    const query = await docClient
      .scan({
        TableName: fcmTokensTable,
        FilterExpression: 'userId = :userId',
        ExpressionAttributeValues: {
          ':userId': userId,
        },
      })
      .promise();

    if (query.Items.length > 0) {
      const item = query.Items[0];
      await docClient
        .update({
          TableName: fcmTokensTable,
          Key: {
            id: item.id,
          },
          UpdateExpression: 'set #token = :token, #updatedAt = :updatedAt',
          ExpressionAttributeNames: {
            '#token': 'token',
            '#updatedAt': 'updatedAt',
          },
          ExpressionAttributeValues: {
            ':token': token,
            ':updatedAt': new Date().toISOString(),
          },
        })
        .promise();
    } else {
      await docClient
        .put({
          TableName: fcmTokensTable,
          Item: {
            id: uuid(),
            token,
            userId,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        })
        .promise();
    }

    res.status(200).json({ success: 'OK' });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

app.post('/sendNotification', async function (req, res) {
  try {
    const { userId, triggeredUser, body, action, title } = req.body;
    const currentDate = new Date().toISOString();
    const oneMonthBefore = new Date(
      new Date().setMonth(new Date().getMonth() - 1)
    ).toISOString();

    await docClient
      .put({
        TableName: notificationsTable,
        Item: {
          id: uuid(),
          userId,
          triggeredUser,
          body,
          action,
          title,
          type: "heavenlyMatchNotifications",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      })
      .promise();

    const tokenItems = (
      await docClient
        .scan({
          TableName: fcmTokensTable,
          FilterExpression:
            'updatedAt between :oneMonthBefore and :currentDate and userId = :userId',
          ExpressionAttributeValues: {
            ':userId': userId,
            ':oneMonthBefore': oneMonthBefore,
            ':currentDate': currentDate,
          },
        })
        .promise()
    ).Items;

    if (tokenItems.length === 0) {
      return res.status(200).json({ success: 'OK' });
    }

    await admin.messaging().send({
      token: tokenItems[0].token,
      notification: {
        title,
        body,
      },
      data: {
        action,
        triggeredUser,
      },
    });

    res.status(204).json({ success: 'OK' });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

app.post('/clearNotifications', async function (req, res) {
  try {
    const { userId } = req.body;
    const query = await docClient
      .scan({
        TableName: notificationsTable,
        FilterExpression: 'userId = :userId',
        ExpressionAttributeValues: {
          ':userId': userId,
        },
      })
      .promise();

    if (query.Items.length > 0) {
      const paramArray = query.Items.map((item) => {
        return {
          DeleteRequest: {
            Key: {
              id: item.id,
            },
          },
        };
      });

      const paramArrayChunks = paramArray.reduce((resultArray, item, index) => {
        const chunkIndex = Math.floor(index / 25);
        if (!resultArray[chunkIndex]) {
          resultArray[chunkIndex] = []; // start a new chunk
        }
        resultArray[chunkIndex].push(item);
        return resultArray;
      }, []);

      const batchWritePromises = paramArrayChunks.map((paramArrayChunk) => {
        return docClient
          .batchWrite({
            RequestItems: {
              [notificationsTable]: paramArrayChunk,
            },
          })
          .promise();
      });

      await Promise.all(batchWritePromises);
    }

    res.status(200).json({ success: 'OK' });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

app.post('/deleteFcmToken', async function (req, res) {
  try {
    const { userId } = req.body;
    const query = await docClient
      .scan({
        TableName: fcmTokensTable,
        FilterExpression: 'userId = :userId',
        ExpressionAttributeValues: {
          ':userId': userId,
        },
      })
      .promise();

    if (query.Items.length > 0) {
      const item = query.Items[0];
      await docClient
        .delete({
          TableName: fcmTokensTable,
          Key: {
            id: item.id,
          },
        })
        .promise();
    }
    res.status(200).json({ success: 'OK' });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

app.post('/sendAnnouncements', async function (req, res) {
  try {
    const { userId, body, action, title } = req.body;
    const triggeredUser = '*';

    // Check user fcm token exist or not
    var userObject = {};
    const userTokens = [];
    var index = 0;
    userId.forEach(function (value) {
      index++;
      var userKey = ':uservalue' + index;
      userObject[userKey.toString()] = value;
    });

    // Create announcemet entry in db
    await Promise.all(
      userId.map(async (id) => {
        await docClient
          .put({
            TableName: notificationsTable,
            Item: {
              id: uuid(),
              userId: id,
              triggeredUser,
              body,
              action,
              title,
              type: "heavenlyMatchNotifications",
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
          })
          .promise();
      })
    );

    var params = {
      TableName: fcmTokensTable,
      FilterExpression:
        'userId IN (' + Object.keys(userObject).toString() + ')',
      ExpressionAttributeValues: userObject,
    };
    const tokenItems = (await docClient.scan(params).promise()).Items;

    // Check tokenItems length
    if (tokenItems.length === 0) {
      return res.status(200).json({ error: 'No token found' });
    }

    tokenItems.map((el) => {
      userTokens.push(el.token);
    });

    // Send notifications on mobile
    await admin.messaging().sendEachForMulticast({
      tokens: userTokens,
      notification: {
        title,
        body,
      },
      data: {
        action,
      },
    });

    res.status(204).json({ success: 'OK' });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

app.listen(3000, function () {
  console.log('App started');
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
