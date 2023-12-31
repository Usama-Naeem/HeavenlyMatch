/* Amplify Params - DO NOT EDIT
	API_HEAVENLYMATCH_GRAPHQLAPIIDOUTPUT
	API_HEAVENLYMATCH_HEAVENLYMATCHFCMTOKENTABLE_ARN
	API_HEAVENLYMATCH_HEAVENLYMATCHFCMTOKENTABLE_NAME
	API_HEAVENLYMATCH_HEAVENLYMATCHNOTIFICATIONTABLE_ARN
	API_HEAVENLYMATCH_HEAVENLYMATCHNOTIFICATIONTABLE_NAME
	API_HEAVENLYMATCH_HEAVENLYMATCHPAYMENTSTABLE_ARN
	API_HEAVENLYMATCH_HEAVENLYMATCHPAYMENTSTABLE_NAME
	API_HEAVENLYMATCH_HEAVENLYMATCHREGISTERAMMOUNTTABLE_ARN
	API_HEAVENLYMATCH_HEAVENLYMATCHREGISTERAMMOUNTTABLE_NAME
	API_HEAVENLYMATCH_HEAVENLYMATCHUSERSTABLE_ARN
	API_HEAVENLYMATCH_HEAVENLYMATCHUSERSTABLE_NAME
	ENV
	REGION
  API_NOTIFICATIONS_APIID
  API_NOTIFICATIONS_APINAME */

const express = require('express');
const bodyParser = require('body-parser');
const AWS = require('aws-sdk');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
const docClient = new AWS.DynamoDB.DocumentClient();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { SESClient, SendTemplatedEmailCommand } = require('@aws-sdk/client-ses');
const { uuid } = require('uuidv4');
const moment = require('moment');
const serviceAccount = require('./serviceAccountKey.json');
const admin = require('firebase-admin');
const notificationsTable =
  process.env.API_HEAVENLYMATCH_HEAVENLYMATCHNOTIFICATIONTABLE_NAME;
const fcmTokensTable =
  process.env.API_HEAVENLYMATCH_HEAVENLYMATCHFCMTOKENTABLE_NAME;
const SES_DEFAULT_EMAIL = process.env.SES_SENDER_EMAIL;

const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());
const client = new SESClient({
  credentials: {
    accessKeyId: process.env.SES_PUBLIC_KEY,
    secretAccessKey: process.env.SES_SECRET_KEY,
  },
  region: 'us-east-1',
});

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

app.put('/paySubscription', async function (req, res) {
  try {
    const user = await setUser(req.query.userId);
    const membershipChange = req.query.membershipChange;
    const amount = req.query.amount;
    let invoice, userPayment;
    if (user !== null) {
      if (
        user.hasOwnProperty('paymentId') &&
        typeof user.paymentId === 'string'
      ) {
        userPayment = await getUserPaymentRecoredByID(user.paymentId);
        invoice = await stripe.invoices.retrieve(userPayment.stripeInvoiceId);
        await resendSubscriptionTemplatedEmail(user, invoice);
      } else {
        // Check! Whether a user is a new profile user or approved user
        if (membershipChange === 'true') {
          invoice = await sendSubscriptionInvoice(user, amount);
          userPayment = await createUserPayment(user, invoice);
          await sendSubscriptionTemplatedEmailToMembershipChangeUser(
            user,
            invoice
          );
        } else {
          invoice = await sendSubscriptionInvoice(user, amount);
          userPayment = await createUserPayment(user, invoice);
          await sendSubscriptionTemplatedEmail(user, invoice);
        }
      }
      return res.status(200).json({
        message: 'Subscription invoice has been created',
        invoice: invoice,
        userPayment: userPayment,
      });
    } else {
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    console.log(err);
    res.json({ err: err, message: 'Something went wrong' });
  }
});

app.post('/paySubscription', async function (req, res) {
  const hook = req.body;
  const invoice = hook.data.object;
  const Action = 'payment';
  const PaymentSuccessfull = 'Payment Successful!';
  const Message = 'Your membership has been upgraded to the premium plan!';
  const triggeredUser = '*';
  switch (hook.type) {
    case 'invoice.paid':
      const user = await setUser(invoice.metadata.userId);
      const payment = await getPaymentRecored(invoice.id);
      await updatePayment(payment, user);
      // call payment notification here
      await sendEmailToUserOnPaymentComplete(user);
      await notifyUserOnPaymentSuccess(
        Action,
        PaymentSuccessfull,
        Message,
        user.id,
        triggeredUser
      );
      break;
    default:
      console.log(`Unhandled event type ${hook.type}`);
      break;
  }
  const updatedUser = await setUser(invoice.metadata.userId);
  const updatedPayment = await getPaymentRecored(invoice.id);
  res.json({ user: { isPaid: updatedUser.isPaid }, payment: updatedPayment });
});

const resendSubscriptionTemplatedEmail = async (user, invoice) => {
  const input = {
    Destination: { ToAddresses: [user?.email.toLowerCase()] },
    Source: SES_DEFAULT_EMAIL,
    Template: 'HEAVENLYMATCH_ACCOUNT_RESENT_SUSBSCRIPTION_TEMPLATE',
    TemplateData: JSON.stringify({
      name: `${user?.firstName} ${user?.lastName}`,
      hostedInvoiceUrl: invoice.hosted_invoice_url,
    }),
  };
  const command = new SendTemplatedEmailCommand(input);
  try {
    const response = await client.send(command);
    return response;
  } catch (err) {
    throw Error(err.message);
  }
};

const sendSubscriptionTemplatedEmail = async (user, invoice) => {
  const input = {
    Destination: { ToAddresses: [user?.email.toLowerCase()] },
    Source: SES_DEFAULT_EMAIL,
    Template: 'HEAVENLYMATCH_ACCOUNT_SUSBSCRIPTION_TEMPLATE',
    TemplateData: JSON.stringify({
      name: `${user?.firstName} ${user?.lastName}`,
      hostedInvoiceUrl: invoice.hosted_invoice_url,
    }),
  };
  const command = new SendTemplatedEmailCommand(input);
  try {
    const response = await client.send(command);
    return response;
  } catch (err) {
    throw Error(err.message);
  }
};

const sendSubscriptionTemplatedEmailToMembershipChangeUser = async (
  user,
  invoice
) => {
  const input = {
    Destination: { ToAddresses: [user?.email.toLowerCase()] },
    Source: SES_DEFAULT_EMAIL,
    Template: 'HEAVENLYMATCH_INCLUDED_IN_PAYMENT_AFTER_APPROVE_TEMPLATE',
    TemplateData: JSON.stringify({
      name: `${user?.firstName} ${user?.lastName}`,
      hostedInvoiceUrl: invoice.hosted_invoice_url,
    }),
  };
  const command = new SendTemplatedEmailCommand(input);
  try {
    const response = await client.send(command);
    return response;
  } catch (err) {
    throw Error(err.message);
  }
};

const sendEmailToUserOnPaymentComplete = async (user) => {
  const input = {
    Destination: { ToAddresses: [user?.email.toLowerCase()] },
    Source: SES_DEFAULT_EMAIL,
    Template: 'HEAVENLYMATCH_PAYMENT_COMPLETE_SUCCESSFULLY_TEMPLATE',
    TemplateData: JSON.stringify({
      name: `${user?.firstName} ${user?.lastName}`,
    }),
  };
  const command = new SendTemplatedEmailCommand(input);
  try {
    const response = await client.send(command);
    return response;
  } catch (err) {
    throw Error(err.message);
  }
};

const createCustomer = async (user) => {
  try {
    const customer = await stripe.customers.create({
      email: user.email,
      name: user.firstName,
    });
    const params = {
      TableName: process.env.API_HEAVENLYMATCH_HEAVENLYMATCHUSERSTABLE_NAME,
      Key: {
        id: user.id,
      },
      UpdateExpression: 'set stripeCustomerId = :customerId',
      ExpressionAttributeValues: {
        ':customerId': customer.id,
      },
    };

    await docClient.update(params).promise();
    return customer;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const createUserPayment = async (user, invoice) => {
  const userPaymentId = uuid();
  try {
    const params = {
      TableName: process.env.API_HEAVENLYMATCH_HEAVENLYMATCHPAYMENTSTABLE_NAME,
      Item: {
        id: userPaymentId,
        userId: user.id,
        paymentStatus: 'pending',
        paymentAmount: (invoice.total / 100).toString(),
        paymentType: 'subscription',
        stripeInvoiceId: invoice.id,
        createdAt: moment().toISOString(),
        updatedAt: moment().toISOString(),
        type: 'heavenlyMatchUser',
      },
    };
    const userPayment = await docClient.put(params).promise();
    const userParams = {
      TableName: process.env.API_HEAVENLYMATCH_HEAVENLYMATCHUSERSTABLE_NAME,
      Key: {
        id: user.id,
      },
      UpdateExpression: 'set paymentId = :userPaymentId',
      ExpressionAttributeValues: {
        ':userPaymentId': userPaymentId,
      },
    };
    await docClient.update(userParams).promise();
    return userPayment;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const sendSubscriptionInvoice = async (user, amount) => {
  try {
    let customerId;
    if (!user.stripeCustomerId) {
      const customer = await createCustomer(user);
      customerId = customer.id;
    } else {
      customerId = user.stripeCustomerId;
    }
    const metaData = { userId: user.id, userEmail: user.email };
    const invoice = await stripe.invoices.create({
      customer: customerId,
      collection_method: 'send_invoice',
      days_until_due: 365,
      description: 'Heavenly Match subscription fee',
      metadata: metaData,
    });
    await stripe.invoiceItems.create({
      customer: customerId,
      unit_amount: amount * 100,
      quantity: 1,
      currency: 'usd',
      description: 'Heavenly Match subscription fee',
      invoice: invoice.id,
    });
    const finalizeInvoice = await stripe.invoices.finalizeInvoice(invoice.id);
    return finalizeInvoice;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const updatePayment = async (payment, user) => {
  try {
    const params = {
      TableName: process.env.API_HEAVENLYMATCH_HEAVENLYMATCHPAYMENTSTABLE_NAME,
      Key: {
        id: payment.id,
      },
      UpdateExpression: 'set paymentStatus = :paymentStatus',
      ExpressionAttributeValues: {
        ':paymentStatus': 'paid',
      },
    };
    const paidPayment = await docClient.update(params).promise();
    const paramsUser = {
      TableName: process.env.API_HEAVENLYMATCH_HEAVENLYMATCHUSERSTABLE_NAME,
      Key: {
        id: user.id,
      },
      UpdateExpression: 'set isPaid = :isPaid',
      ExpressionAttributeValues: {
        ':isPaid': true,
      },
    };
    const paidUser = await docClient.update(paramsUser).promise();
    return { user: paidUser, payment: paidPayment };
  } catch (err) {
    console.log(err);
    return err;
  }
};
// get payment recored by payment id
const getUserPaymentRecoredByID = async (paymentId) => {
  try {
    const params = {
      TableName: process.env.API_HEAVENLYMATCH_HEAVENLYMATCHPAYMENTSTABLE_NAME,
      FilterExpression: 'id = :value',
      ExpressionAttributeValues: { ':value': paymentId },
    };
    const payment = await docClient.scan(params).promise();
    return payment.Items[0];
  } catch (err) {
    return err;
  }
};

// get payment recored by invoice id
const getPaymentRecored = async (invoiceId) => {
  try {
    const params = {
      TableName: process.env.API_HEAVENLYMATCH_HEAVENLYMATCHPAYMENTSTABLE_NAME,
      FilterExpression: 'stripeInvoiceId = :value',
      ExpressionAttributeValues: { ':value': invoiceId },
    };
    const payment = await docClient.scan(params).promise();
    return payment.Items[0];
  } catch (err) {
    return err;
  }
};

const setUser = async (userId) => {
  try {
    const params = {
      TableName: process.env.API_HEAVENLYMATCH_HEAVENLYMATCHUSERSTABLE_NAME,
      KeyConditionExpression: '#name = :value',
      ExpressionAttributeValues: { ':value': userId },
      ExpressionAttributeNames: { '#name': 'id' },
    };
    const user = await docClient.query(params).promise();
    return user.Items[0];
  } catch (err) {
    return err;
  }
};

const notifyUserOnPaymentSuccess = async (
  action,
  title,
  body,
  userId,
  triggeredUser
) => {
  try {
    // const { userId, triggeredUser, body, action, title } = req.body;
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
          type: 'heavenlyMatchNotifications',
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
      return;
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
  } catch (err) {
    console.log(err);
  }
};

app.listen(3000, function () {
  console.log('App started');
});

module.exports = app;
