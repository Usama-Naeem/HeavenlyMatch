import {
  SESClient,
  SendTemplatedEmailCommand,
  CreateTemplateCommand,
  UpdateTemplateCommand,
  SendBulkTemplatedEmailCommand,
} from '@aws-sdk/client-ses';
import {
  AMPLIFY_CONFIG,
  SES_DEFAULT_EMAIL,
} from '../../utilities/amplifyConfig';

const client = new SESClient(AMPLIFY_CONFIG);

export const sendSuspendTemplatedEmail = async (
  toAddress,
  templateName,
  name
) => {
  const input = {
    Destination: { ToAddresses: [toAddress] },
    Source: SES_DEFAULT_EMAIL,
    Template: templateName,
    TemplateData: JSON.stringify({ name: name }),
  };
  const command = new SendTemplatedEmailCommand(input);
  try {
    const response = await client.send(command);
    return response;
  } catch (err) {
    throw Error(err.message);
  }
};

export const suspendUserTemplate = async () => {
  const TEMPLATE_NAME = 'HEAVENLYMATCH_ACCOUNT_SUSPEND_TEMPLATE';

  const createSuspendTemplateCommand = () =>
    new UpdateTemplateCommand({
      Template: {
        TemplateName: TEMPLATE_NAME,
        HtmlPart: `
       <p>Hello, <strong>{{name}}!</strong></p>
          <p>
          Your user account has been suspended, and unfortunately you won't be able to access the platform. In case of any query please 
          contact us at <a href="mailto:admin@heavenlymatch.com">admin@heavenlymatch.com</a>.
          </p>
          </br>
          <p>Regards,</p>
          <p>Team Heavenlymatch</p>
        `,
        SubjectPart: 'Account Suspend',
      },
    });

  const createTemplateCommand = createSuspendTemplateCommand();
  try {
    await client.send(createTemplateCommand);
  } catch (err) {
    throw Error(err);
  }
};

export const sendEnableUserTemplatedEmail = async (
  toAddress,
  templateName,
  name
) => {
  const input = {
    Destination: { ToAddresses: [toAddress] },
    Source: SES_DEFAULT_EMAIL,
    Template: templateName,
    TemplateData: JSON.stringify({ name: name }),
  };
  const command = new SendTemplatedEmailCommand(input);
  try {
    const response = await client.send(command);
    return response;
  } catch (err) {
    throw Error(err.message);
  }
};

export const enableUserTemplate = async () => {
  const TEMPLATE_NAME = 'HEAVENLYMATCH_ACCOUNT_ENABLE_TEMPLATE';

  const createSuspendTemplateCommand = () =>
    new UpdateTemplateCommand({
      Template: {
        TemplateName: TEMPLATE_NAME,
        HtmlPart: `
          <p>
         Your user account has now been activated. You can now continue to use the platform.  
          </p>
          </br>
          <p>Regards,</p>
          <p>Team Heavenlymatch</p>
        `,
        SubjectPart: 'Account Activated',
      },
    });

  const createTemplateCommand = createSuspendTemplateCommand();
  try {
    await client.send(createTemplateCommand);
  } catch (err) {
    throw Error(err);
  }
};

// Helper function to split the array into chunks
const chunkArray = (array, chunkSize) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
};

export const sendAnnouncementEmailTemplate = async (
  users,
  templateName,
  AnnouncementText
) => {
  // Divide users into chunks of 50
  const chunkedUsers = chunkArray(users, 50);
  // Send emails in batches
  const responses = [];
  for (const chunk of chunkedUsers) {
    const input = {
      Destinations: chunk.map((user) => ({
        Destination: { ToAddresses: [user.email] },
      })),
      Source: SES_DEFAULT_EMAIL,
      Template: templateName,
      DefaultTemplateData: JSON.stringify({
        AnnouncementText: AnnouncementText,
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

export const announcementEmailTemplate = async () => {
  const TEMPLATE_NAME = 'HEAVENLYMATCH_ANNOUNCEMENT_EMAIL_TEMPLATE';

  const createAnnouncementTemplateCommand = () =>
    new CreateTemplateCommand({
      Template: {
        TemplateName: TEMPLATE_NAME,
        HtmlPart: `
       <p>Hello, <strong>Good day</strong></p>
          <p>
          {{AnnouncementText}}
          </p>
          </br>
          <p>Regards,</p>
          <p>Heavenlymatch</p>
        `,
        SubjectPart: 'New Announcement',
      },
    });

  const createTemplateCommand = createAnnouncementTemplateCommand();
  try {
    await client.send(createTemplateCommand);
  } catch (err) {
    throw Error(err);
  }
};

export const updateTemplate = async () => {
  const TEMPLATE_NAME = 'HEAVENLYMATCH_ANNOUNCEMENT_EMAIL_TEMPLATE';

  const createUpdateTemplateCommand = () =>
    new UpdateTemplateCommand({
      Template: {
        TemplateName: TEMPLATE_NAME,
        HtmlPart: `
          <p>Hello, <strong>{{name}}!</strong></p>
          <p>
          {{AnnouncementText}}
          </p>
          </br>
          <p>Regards,</p>
          <p>Heavenlymatch</p>
        `,
        SubjectPart: 'New Announcement',
      },
    });

  const updateTemplateCommand = createUpdateTemplateCommand();
  try {
    await client.send(updateTemplateCommand);
  } catch (err) {
    throw Error(err);
  }
};

// Bio rejection email command
export const sendBioRejectionEmailTemplate = async (
  toAddress,
  templateName,
  name,
  RejectionText
) => {
  const input = {
    Destination: { ToAddresses: [toAddress] },
    Source: SES_DEFAULT_EMAIL,
    Template: templateName,
    TemplateData: JSON.stringify({ name: name, RejectionText: RejectionText }),
  };
  const command = new SendTemplatedEmailCommand(input);
  try {
    const response = await client.send(command);
    return response;
  } catch (err) {
    throw Error(err.message);
  }
};

export const updateBioRejectionEmailTemplate = async () => {
  const TEMPLATE_NAME = 'HEAVENLYMATCH_BIO_REJECTION_EMAIL_TEMPLATE';

  const createBioRejectionTemplateCommand = () =>
    new UpdateTemplateCommand({
      Template: {
        TemplateName: TEMPLATE_NAME,
        HtmlPart: `
       <p>As-salamu alaykum <strong>{{name}}</strong></p>
          <p>
         Our heavenly Match administrator denied your bio change due to the following reason:</p>
          <p>
          {{RejectionText}}.
          </p>
          </br>
          <p>
          You can resubmit the profile from the application, making the necessary updates based on the feedback provided. If you have any questions or need further assistance, please do not hesitate to contact us.</p>
          </br>
          <p>Thank you for your understanding and cooperation.</p>
          </br>
          <p>Regards,</p>
          <p>Team Heavenly Match</p>
        `,
        SubjectPart: 'Bio Rejection Notice',
      },
    });

  const createTemplateCommand = createBioRejectionTemplateCommand();
  try {
    await client.send(createTemplateCommand);
  } catch (err) {
    throw Error(err);
  }
};

// Bio Approval email command
export const sendBioApprovalEmailTemplate = async (
  toAddress,
  templateName,
  name
) => {
  const input = {
    Destination: { ToAddresses: [toAddress] },
    Source: SES_DEFAULT_EMAIL,
    Template: templateName,
    TemplateData: JSON.stringify({ name: name }),
  };
  const command = new SendTemplatedEmailCommand(input);
  try {
    const response = await client.send(command);
    return response;
  } catch (err) {
    throw Error(err.message);
  }
};

export const bioApprovalEmailTemplate = async () => {
  const TEMPLATE_NAME = 'HEAVENLYMATCH_BIO_APPROVED_EMAIL_TEMPLATE';

  const createBioApprovalTemplateCommand = () =>
    new UpdateTemplateCommand({
      Template: {
        TemplateName: TEMPLATE_NAME,
        HtmlPart: `
       <p>As-salamu alaykum <strong>{{name}}</strong></p>
          <p>
          Our heavenly Match administrator has approved your bio change request. You can now continue to use the platform.
          </p>
          </br>
          <p>Regards,</p>
          <p>Team Heavenly Match</p>
        `,
        SubjectPart: 'Bio Changes Approved',
      },
    });

  const createTemplateCommand = createBioApprovalTemplateCommand();
  try {
    await client.send(createTemplateCommand);
  } catch (err) {
    throw Error(err);
  }
};

// Reject user new profile email command
export const sendProfileRejectionEmailTemplate = async (
  toAddress,
  templateName,
  name,
  RejectionText
) => {
  const input = {
    Destination: { ToAddresses: [toAddress] },
    Source: SES_DEFAULT_EMAIL,
    Template: templateName,
    TemplateData: JSON.stringify({ name: name, RejectionText: RejectionText }),
  };
  const command = new SendTemplatedEmailCommand(input);
  try {
    const response = await client.send(command);
    return response;
  } catch (err) {
    throw Error(err.message);
  }
};

export const profileRejectionEmailTemplate = async () => {
  const TEMPLATE_NAME = 'HEAVENLYMATCH_PROFILE_REJECTION_EMAIL_TEMPLATE';

  const createProfileRejectionTemplateCommand = () =>
    new UpdateTemplateCommand({
      Template: {
        TemplateName: TEMPLATE_NAME,
        HtmlPart: `
       <p>As-salamu alaykum <strong>{{name}}</strong></p>
          <p>
         We hope this email finds you well. We would like to take a moment to express our sincere appreciation for your interest in joining our Heavenly Match Platform. We understand that finding a suitable life partner is an important decision, and we value your trust in our platform.
         </p>
          </br>
          <p>
          After careful consideration and review of your profile, we regret to inform you that we are unable to accept your application at this time.
          </p>
          </br>
          <p>
          The reason for the rejection of your profile is as follows: {{RejectionText}}.</p>
          </br>
          <p>
          You can resubmit the profile from the application, making the necessary updates based on the feedback provided. If you have any questions or need further assistance, please do not hesitate to contact us.</p>
          </br>
          <p>
          Thank you for your understating and cooperation.
          </p>
          </br>
          <p>Regards,</p>
          <p>Team Heavenly Match</p>
        `,
        SubjectPart: 'Profile Rejection',
      },
    });

  const createTemplateCommand = createProfileRejectionTemplateCommand();
  try {
    await client.send(createTemplateCommand);
  } catch (err) {
    throw Error(err);
  }
};

// Image rejection email command
export const sendImageRejectionEmailTemplate = async (
  toAddress,
  templateName,
  name,
  RejectionText
) => {
  const input = {
    Destination: { ToAddresses: [toAddress] },
    Source: SES_DEFAULT_EMAIL,
    Template: templateName,
    TemplateData: JSON.stringify({ name: name, RejectionText: RejectionText }),
  };
  const command = new SendTemplatedEmailCommand(input);
  try {
    const response = await client.send(command);
    return response;
  } catch (err) {
    throw Error(err.message);
  }
};

export const imageRejectionEmailTemplate = async () => {
  const TEMPLATE_NAME = 'HEAVENLYMATCH_IMAGE_REJECTION_EMAIL_TEMPLATE';

  const createImageRejectionTemplateCommand = () =>
    new UpdateTemplateCommand({
      Template: {
        TemplateName: TEMPLATE_NAME,
        HtmlPart: `
          <p>As-salamu alaykum <strong>{{name}}</strong></p>
          <p>
         Our Heavenly Match administrator denied your picture update due to the following reason: </p>
          <p>
         {{RejectionText}}.
          </p>
          </br>
          <p>
          You can resubmit the image from the application, making the necessary updates based on the feedback provided. If you have any questions or need further assistance, please do not hesitate to contact us.</p>
          </br>
          <p>
          Thank you for your understating and cooperation.
          </p>
          </br>
          <p>Regards,</p>
          <p>Team Heavenly Match</p>
        `,
        SubjectPart: 'Image Rejection Notice ',
      },
    });

  const createTemplateCommand = createImageRejectionTemplateCommand();
  try {
    await client.send(createTemplateCommand);
  } catch (err) {
    throw Error(err);
  }
};

// Image approval email command
export const sendImageApprovalEmailTemplate = async (
  toAddress,
  templateName,
  name
) => {
  const input = {
    Destination: { ToAddresses: [toAddress] },
    Source: SES_DEFAULT_EMAIL,
    Template: templateName,
    TemplateData: JSON.stringify({ name: name }),
  };
  const command = new SendTemplatedEmailCommand(input);
  try {
    const response = await client.send(command);
    return response;
  } catch (err) {
    throw Error(err.message);
  }
};

export const imageApprovalEmailTemplate = async () => {
  const TEMPLATE_NAME = 'HEAVENLYMATCH_IMAGE_APPROVAL_EMAIL_TEMPLATE';

  const createImageApprovalTemplateCommand = () =>
    new UpdateTemplateCommand({
      Template: {
        TemplateName: TEMPLATE_NAME,
        HtmlPart: `
          <p>As-salamu alaykum <strong>{{name}}</strong></p>
          <p>
          Our heavenly Match administrator has approved your picture change request. You can now continue to use the platform.
          </p>
          </br>
          <p>Regards,</p>
          <p>Team Heavenly Match</p>
        `,
        SubjectPart: 'Picture Changes Approved',
      },
    });

  const createTemplateCommand = createImageApprovalTemplateCommand();
  try {
    await client.send(createTemplateCommand);
  } catch (err) {
    throw Error(err);
  }
};

// Suspend user profile email command
export const sendSuspendUserEmailTemplate = async (
  RejectionText,
  toAddress,
  templateName,
  name
) => {
  const input = {
    Destination: { ToAddresses: [toAddress] },
    Source: SES_DEFAULT_EMAIL,
    Template: templateName,
    TemplateData: JSON.stringify({
      name: name,
      RejectionText: RejectionText,
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

export const suspendUserEmailTemplate = async () => {
  const TEMPLATE_NAME = 'HEAVENLYMATCH_SUSPEND_USER_TEMPLATE';

  const createSuspendUserTemplateCommand = () =>
    new UpdateTemplateCommand({
      Template: {
        TemplateName: TEMPLATE_NAME,
        HtmlPart: `
          <p>As-salamu alaykum, <strong>{{name}}</strong></p>
          </br>
          <p>We hope this email finds you well. Your account on Heavenly Match has been suspended. This action has been taken in response to a report received from another candidate.</p>
           <p>Here is the reason for your account suspension: {{RejectionText}}.</p>
          <p>We appreciate your cooperation with our platform's guidelines and policies. Our priority is to maintain a safe and inclusive community for all our users, and we will take the necessary steps to uphold these values.</p>
          </br>
          <p>Thank you for your understating and cooperation.</p>
          </br>
          <p>Best Regards,</p>
          <p>Team Heavenly Match</p>
        `,
        SubjectPart: 'Account Suspend Notice',
      },
    });

  const createTemplateCommand = createSuspendUserTemplateCommand();
  try {
    await client.send(createTemplateCommand);
  } catch (err) {
    throw Error(err);
  }
};

// Dismiss Suspend action against user profile email command
export const sendDismissSuspendUserEmailTemplate = async (
  toAddress,
  templateName,
  reportedByUsername,
  reportedUsername
) => {
  const input = {
    Destination: { ToAddresses: [toAddress] },
    Source: SES_DEFAULT_EMAIL,
    Template: templateName,
    TemplateData: JSON.stringify({
      reportedByUsername,
      reportedUsername,
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

export const dismissSuspendUserEmailTemplate = async () => {
  const TEMPLATE_NAME = 'HEAVENLYMATCH_DISMISS_SUSPEND_USER_EMAIL_TEMPLATE';

  const createDismissSuspendUserTemplateCommand = () =>
    new UpdateTemplateCommand({
      Template: {
        TemplateName: TEMPLATE_NAME,
        HtmlPart: `
          <p>Dear <strong>{{reportedByUsername}}</strong></p>
          <p>
          We hope this email finds you well. We are writing to inform you that we have reviewed the report you filed against a profile, and after careful consideration, we have decided to dismiss the report of <strong>{{reportedUsername}}</strong> as it does not violate any guidelines or rules.</p>
          </br>
          <p>Thank you for your understating and cooperation.</p>
          </br>
          <p>Best Regards,</p>
          <p>Team Heavenly Match</p>
        `,
        SubjectPart: 'Dismiss Profile Suspension',
      },
    });

  const createTemplateCommand = createDismissSuspendUserTemplateCommand();
  try {
    await client.send(createTemplateCommand);
  } catch (err) {
    throw Error(err);
  }
};

// Stripe payment email command
export const createSubscriptionTemplate = async () => {
  const TEMPLATE_NAME = 'HEAVENLYMATCH_ACCOUNT_SUSBSCRIPTION_TEMPLATE';

  const createSubscriptionTemplateCommand = () =>
    new UpdateTemplateCommand({
      Template: {
        TemplateName: TEMPLATE_NAME,
        HtmlPart: `
          <p>As-salamu alaykum, <strong>{{name}}!</strong></p>
          </br>
          <p>We are thrilled to inform you that your profile has been approved by our administrators at Heavenly Match. Currently, you are on our free plan, which offers a range of features and opportunities. However, we would like to introduce you to our premium plan, which provides even more benefits to help you maximize your chances of finding the perfect match. With the premium plan, you gain access to the following exclusive features:</p>
         </br>
          <ul>
          <li>View full profile including hidden fields</li>
          <li>View a candidate’s image gallery</li>
          <li>Send and receive match requests</li>
          <li>Chat with matched candidates</li>
          </ul>
          </br>
          <p>To unlock these benefits, simply click on the payment link below and make a one time payment to activate the premium plan:</p>
          </br>
          <p><a href="{{hostedInvoiceUrl}}">Payment Link</a></p>
          </br>
          <p>Thank you for choosing Heavenly Match.</p>
          </br>
          <p>Regards</p>
          <p>Team Heavenly Match</p>
        `,
        SubjectPart: 'Welcome to Heavenly Match!',
      },
    });

  const createTemplateCommand = createSubscriptionTemplateCommand();
  try {
    await client.send(createTemplateCommand);
  } catch (err) {
    throw Error(err);
  }
};

export const updateSubscriptionUserTemplate = async () => {
  const TEMPLATE_NAME = 'HEAVENLYMATCH_ACCOUNT_SUSBSCRIPTION_TEMPLATE';

  const createUpdateTemplateCommand = () =>
    new UpdateTemplateCommand({
      Template: {
        TemplateName: TEMPLATE_NAME,
        HtmlPart: `
          <p>Hello, <strong>{{name}}!</strong></p>

          <p>We are thrilled to inform you that your profile has been approved by our administrators at Heavenly Match. Currently, you are on our free plan, which offers a range of features and opportunities. However, we would like to introduce you to our premium plan, which provides even more benefits to help you maximize your chances of finding the perfect match. With the premium plan, you gain access to the following exclusive features:</p>

          <p>With the premium plan, you can take the initiative and create matches with other candidates based on your preferences and criteria. This feature allows you to proactively connect with potential opportunities and increase your visibility within our platform.</p>

          <p>Gain comprehensive insights into other candidates by accessing their complete profiles, including additional information, experiences, and qualifications. This valuable resource enables you to make more informed decisions when pursuing potential matches and opportunities.</p>

          <p>To upgrade to our premium plan and unlock these benefits, simply click on the payment link provided below:</p>

          <p><a href="{{hostedInvoiceUrl}}">Payment Link</a></p>

          <p>Thank you for choosing Heavenly Match.</p>

          <p>Best regards,<br>Team Heavenly Match</p>
        `,
        SubjectPart: 'Congratulations! Your Profile is Approved',
      },
    });

  const updateTemplateCommand = createUpdateTemplateCommand();
  try {
    await client.send(updateTemplateCommand);
  } catch (err) {
    throw Error(err);
  }
};

// Tema memeber invite email command
export const inviteTeamMemberTemplate = async () => {
  const TEMPLATE_NAME = 'INVITE_TEAM_MEMBER_TEMPLATE';

  const createSuspendTemplateCommand = () =>
    new CreateTemplateCommand({
      Template: {
        TemplateName: TEMPLATE_NAME,
        HtmlPart: `
       <p>Hello, <strong>{{name}}!</strong></p>
          <p>
          We hope this email finds you well. We are delighted to invite you to join our Heavenly Match. Here are the login credentials to access the dashboard, after the first sign in you will have to set your password in order to continue.
          </p>
          <p><strong>Username: </strong>{{email}}</p>
          <p><strong>Temporary Password: </strong>{{temporaryPassword}}</p>
          <p><strong>Access Link: </strong><a href="{{webAppUrl}}">Heavenly Match</a></p>
          </br>
          <p>Regards,</p>
          <p>Team Heavenlymatch</p>
        `,
        SubjectPart: 'Invitation to Join Heavenly Match Team',
      },
    });

  const createTemplateCommand = createSuspendTemplateCommand();
  try {
    await client.send(createTemplateCommand);
  } catch (err) {
    throw Error(err);
  }
};

export const sendTeamMemberInviteEmail = async (
  toAddress,
  templateName,
  name,
  email,
  temporaryPassword,
  webAppUrl
) => {
  const input = {
    Destination: { ToAddresses: [toAddress] },
    Source: SES_DEFAULT_EMAIL,
    Template: templateName,
    TemplateData: JSON.stringify({
      name,
      email,
      temporaryPassword,
      webAppUrl,
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

// Candidate invite email command
export const sendInviteCandidateEmailTemplate = async (users, templateName) => {
  const input = {
    Destinations: users.map((user) => ({
      Destination: { ToAddresses: [user] },
    })),
    Source: SES_DEFAULT_EMAIL,
    Template: templateName,
    DefaultTemplateData: JSON.stringify({
      InviteText: 'hello',
    }),
  };
  const command = new SendBulkTemplatedEmailCommand(input);
  try {
    const response = await client.send(command);
    return response;
  } catch (err) {
    throw Error(err.message);
  }
};

export const inviteCandidateEmailTemplate = async () => {
  const TEMPLATE_NAME = 'HEAVENLYMATCH_INVITE_CANDIDATE_EMAIL_TEMPLATE';

  const createInviteCandidateTemplateCommand = () =>
    new CreateTemplateCommand({
      Template: {
        TemplateName: TEMPLATE_NAME,
        HtmlPart: `
       <p>Hello, <strong>Good day</strong></p>
          <p>
          We hope this email finds you well. We are delighted to invite you to join our Heavenly Match community and embark on a journey to find your ideal partner. To make your experience seamless and convenient, we encourage you to download our mobile application and create your account directly from your smartphone. </br>
          - Android users click <a href="https://play.google.com/store/apps/eventdetails/4829120397958389979?hl=en&gl=US">here</a> to download the application directly. 
          - For iOS users, click <a href="https://apps.apple.com/us/app/papas-cluckeria-to-go/id1591627945">here</a> to download the application directly.
          </br>
          Thank you for choosing Heavenly Match.
          </p>
          </br>
          <p>Regards,</p>
          <p>Team Heavenlymatch</p>
        `,
        SubjectPart: 'Invitation to Join Heavenly Match',
      },
    });

  const createTemplateCommand = createInviteCandidateTemplateCommand();
  try {
    await client.send(createTemplateCommand);
  } catch (err) {
    throw Error(err);
  }
};

// Excluded from payments Approve candidate email command
export const sendExcludedFromPaymentEmail = async (
  toAddress,
  templateName,
  name
) => {
  const input = {
    Destination: { ToAddresses: [toAddress] },
    Source: SES_DEFAULT_EMAIL,
    Template: templateName,
    TemplateData: JSON.stringify({ name: name }),
  };
  const command = new SendTemplatedEmailCommand(input);
  try {
    const response = await client.send(command);
    return response;
  } catch (err) {
    throw Error(err.message);
  }
};

export const excludedFromPaymentEmailTemplate = async () => {
  const TEMPLATE_NAME = 'HEAVENLYMATCH_EXCLUDED_FROM_PAYMENT_TEMPLATE';

  const createExclucdedFromPaymentTemplateCommand = () =>
    new CreateTemplateCommand({
      Template: {
        TemplateName: TEMPLATE_NAME,
        HtmlPart: `
       <p>Hello <strong>{{name}}</strong></p>
          <p>
          We are thrilled to inform you that your profile has been approved by our administrators at Heavenly Match. As a gesture of appreciation for joining Heavenly Match and to celebrate your profile approval, we are pleased to grant you complimentary access to all our premium features. This means you can now enjoy the full range of benefits and functionalities without any payment obligations.
          To access the premium features, simply login to your Heavenly Match account and explore the app.
          Once again, congratulations on your profile approval, and welcome to the Heavenly Match community! We wish you a wonderful journey in your search for love and companionship.
          Thank you for choosing Heavenly Match.
          </p>
          </br>
          <p>Best regards,</p>
          <p>Team Heavenly Match</p>
        `,
        SubjectPart: 'Congratulations! Your Profile is Approved',
      },
    });

  const createTemplateCommand = createExclucdedFromPaymentTemplateCommand();
  try {
    await client.send(createTemplateCommand);
  } catch (err) {
    throw Error(err);
  }
};

export const updateResendSubscriptionUserTemplate = async () => {
  const TEMPLATE_NAME = 'HEAVENLYMATCH_ACCOUNT_RESENT_SUSBSCRIPTION_TEMPLATE';

  const createUpdateTemplateCommand = () =>
    new UpdateTemplateCommand({
      Template: {
        TemplateName: TEMPLATE_NAME,
        HtmlPart: `
        <p>As-salamu alaykum, <strong>{{name}}!</strong></p>
         <p>
        Thank you for requesting premium membership. With this plan, you gain access to the following exclusive features:
        </p>
      <ul>
        <li>View full profile including hidden fields</li>
        <li>View a candidate’s image gallery</li>
        <li>Send and receive match requests</li>
        <li>Chat with matched candidates</li>
        </ul>
      <p>To unlock these benefits, simply click on the payment link below and make a one time payment to activate the premium plan:</p>
          <p><a href="{{hostedInvoiceUrl}}">Payment Link</a></p>
          </br>
          <p>Regards </p>
          </br>
          <p>Team Heavenly Match</p>
        `,
        SubjectPart: 'Upgrade Membership',
      },
    });

  const updateTemplateCommand = createUpdateTemplateCommand();
  try {
    await client.send(updateTemplateCommand);
  } catch (err) {
    throw Error(err);
  }
};

// Excluded from payments after Approve candidate email command
export const sendExcludedFromPaymentEmailAfterApproval = async (
  toAddress,
  templateName,
  name
) => {
  const input = {
    Destination: { ToAddresses: [toAddress] },
    Source: SES_DEFAULT_EMAIL,
    Template: templateName,
    TemplateData: JSON.stringify({ name: name }),
  };
  const command = new SendTemplatedEmailCommand(input);
  try {
    const response = await client.send(command);
    return response;
  } catch (err) {
    throw Error(err.message);
  }
};

export const excludedFromPaymentAfterApproveEmailTemplate = async () => {
  const TEMPLATE_NAME =
    'HEAVENLYMATCH_EXCLUDED_FROM_PAYMENT_AFTER_APPROVE_TEMPLATE';

  const createExclucdedFromPaymentTemplateCommand = () =>
    new CreateTemplateCommand({
      Template: {
        TemplateName: TEMPLATE_NAME,
        HtmlPart: `
       <p>Hello <strong>{{name}}</strong></p>
          <p>
          Congratulations! As a gesture of appreciation from Heavenly Match, we are pleased to grant you complimentary access to all our 
          premium features. This means you can now enjoy the full range of benefits and functionalities without any payment obligations.
          </p>
          </br>
          <p>To access the premium features, simply log in to your Heavenly Match account and explore the app.</p>
          </br>
          <p>Once again, congratulations on getting premium access! We wish you a wonderful journey in your search for love and companionship.</p>
          </br>
          <p>Thank you for choosing Heavenly Match.</p>
          </br>
          <p>Best regards,</p>
          <p>Team Heavenly Match</p>
        `,
        SubjectPart: 'Congratulations on Premium Access at Heavenly Match',
      },
    });

  const createTemplateCommand = createExclucdedFromPaymentTemplateCommand();
  try {
    await client.send(createTemplateCommand);
  } catch (err) {
    throw Error(err);
  }
};

// Included in payments after Approve candidate email command
export const sendIncludedInPaymentEmailAfterApproval = async (
  toAddress,
  templateName,
  name
) => {
  const input = {
    Destination: { ToAddresses: [toAddress] },
    Source: SES_DEFAULT_EMAIL,
    Template: templateName,
    TemplateData: JSON.stringify({ name: name }),
  };
  const command = new SendTemplatedEmailCommand(input);
  try {
    const response = await client.send(command);
    return response;
  } catch (err) {
    throw Error(err.message);
  }
};

export const includedInPaymentAfterApproveEmailTemplate = async () => {
  const TEMPLATE_NAME =
    'HEAVENLYMATCH_INCLUDED_IN_PAYMENT_AFTER_APPROVE_TEMPLATE';

  const createInclucdedFromPaymentTemplateCommand = () =>
    new UpdateTemplateCommand({
      Template: {
        TemplateName: TEMPLATE_NAME,
        HtmlPart: `
       <p>As-salamu alaykum <strong>{{name}}</strong></p>
        <p>
       We hope this email finds you well. We wanted to bring to your attention that your premium access for free on Heavenly Match has expired and moved to the free plan. As a valued member of our community, we hope you have enjoyed the exclusive benefits that came with your premium access. In order to continue using the premium features and enhanced opportunities to find your perfect match, simply click on the payment link below and make a one time payment to activate the premium plan:
        </p>
      </br>
      <p><a href="{{hostedInvoiceUrl}}">Payment Link</a></p>
      </br>
      <p>Thank you for choosing Heavenly Match.</p>
      </br>
      <p>Regards,</p>
      <p>Team Heavenly Match</p>
        `,
        SubjectPart: 'Upgrade Membership!',
      },
    });

  const createTemplateCommand = createInclucdedFromPaymentTemplateCommand();
  try {
    await client.send(createTemplateCommand);
  } catch (err) {
    throw Error(err);
  }
};

export const paymentSuccessfullyCompletedEmailTemplate = async () => {
  const TEMPLATE_NAME = 'HEAVENLYMATCH_PAYMENT_COMPLETE_SUCCESSFULLY_TEMPLATE';

  const createInclucdedFromPaymentTemplateCommand = () =>
    new UpdateTemplateCommand({
      Template: {
        TemplateName: TEMPLATE_NAME,
        HtmlPart: `
       <p>As-salamu alaykum <strong>{{name}}</strong></p>
        <p>Your membership has been upgraded to the premium plan! With this plan, you gain access to the following exclusive features:</p>
        </br>
        <ul>
        <li>View full profile including hidden fields</li>
        <li>View a candidate’s image gallery</li>
        <li>Send and receive match requests</li>
        <li>Chat with matched candidates</li>
        </ul>
        </br>
        <p>Open your app now to access these unlocked features.</p>
      </br>
      <p>Regards,</p>
      <p>Team Heavenly Match</p>
        `,
        SubjectPart: 'Premium Membership Activated',
      },
    });

  const createTemplateCommand = createInclucdedFromPaymentTemplateCommand();
  try {
    await client.send(createTemplateCommand);
  } catch (err) {
    throw Error(err);
  }
};

export const createBioTemplate = async () => {
  const TEMPLATE_NAME = 'HEAVENLYMATCH_UPDATE_BIO_TEMPLATE';

  const createUpdateBioTemplateCommand = () =>
    new CreateTemplateCommand({
      Template: {
        TemplateName: TEMPLATE_NAME,
        HtmlPart: `
          <p>
          A new bio has been submitted on Heavenly Match and requires a review for moderation purposes.
          </p>
          </br>
          <p>Regards,</p>
          <p>Team Heavenlymatch</p>
          <p>Name: {{name}}</p>
          <p>Email: {{email}}</p>
          </br>
          <p>Backoffice Link: <a href="{{link}}"/>Admin Panel</a> </p>
        `,
        SubjectPart: 'New Bio Moderation',
      },
    });

  const createTemplateCommand = createUpdateBioTemplateCommand();
  try {
    await client.send(createTemplateCommand);
  } catch (err) {
    throw Error(err);
  }
};

export const updateBioTemplate = async () => {
  const TEMPLATE_NAME = 'HEAVENLYMATCH_UPDATE_BIO_TEMPLATE';

  const updateBioTemplateCommand = () =>
    new UpdateTemplateCommand({
      Template: {
        TemplateName: TEMPLATE_NAME,
        HtmlPart: `
        <p>As-salamu alaykum </p>
          <p>
          A new bio has been submitted on Heavenly Match and requires a review for moderation purposes. Please click on the given <a href="{{link}}">Link</a> to moderate the request.
          </p>
          </br>
          <p>Candidate Name: {{name}}</p>
          <p>Email: {{email}}</p>
        `,
        SubjectPart: 'New Bio Moderation',
      },
    });

  const createTemplateCommand = updateBioTemplateCommand();
  try {
    await client.send(createTemplateCommand);
  } catch (err) {
    throw Error(err);
  }
};

export const createImageUpdationTemplate = async () => {
  const TEMPLATE_NAME = 'HEAVENLYMATCH_UPDATE_IMAGE_TEMPLATE';

  const createUpdateImageTemplateCommand = () =>
    new CreateTemplateCommand({
      Template: {
        TemplateName: TEMPLATE_NAME,
        HtmlPart: `
        <p>As-salamu alaykum </p>
          <p>
          A new image has been submitted on Heavenly Match and requires a review for moderation purposes. Please click on the given <a href="{{link}}">Link</a> to moderate the request.
          </p>
          </br>
          <p>Candidate Name: {{name}}</p>
          <p>Email: {{email}}</p>
        `,
        SubjectPart: 'New Image Moderation',
      },
    });

  const createTemplateCommand = createUpdateImageTemplateCommand();
  try {
    await client.send(createTemplateCommand);
  } catch (err) {
    throw Error(err);
  }
};

export const createNewProfileTemplate = async () => {
  const TEMPLATE_NAME = 'HEAVENLYMATCH_NEW_USER_TEMPLATE';

  const createNewProfileTemplateCommand = () =>
    new CreateTemplateCommand({
      Template: {
        TemplateName: TEMPLATE_NAME,
        HtmlPart: `
        <p>As-salamu alaykum </p>
          <p>
          A new user has registered on Heavenly Match and requires a profile review for moderation purposes. Please click on the given <a href="{{link}}">Link</a> to moderate the request.
          </p>
          </br>
          <p>Candidate Name: {{name}}</p>
          <p>Email: {{email}}</p>
        `,
        SubjectPart: 'New Image Moderation',
      },
    });

  const createTemplateCommand = createNewProfileTemplateCommand();
  try {
    await client.send(createTemplateCommand);
  } catch (err) {
    throw Error(err);
  }
};

export const updateNewProfileTemplate = async () => {
  const TEMPLATE_NAME = 'HEAVENLYMATCH_NEW_USER_TEMPLATE';

  const updateNewProfileTemplateCommand = () =>
    new UpdateTemplateCommand({
      Template: {
        TemplateName: TEMPLATE_NAME,
        HtmlPart: `
        <p>As-salamu alaykum </p>
          <p>
          A new user has registered on Heavenly Match and requires a profile review for moderation purposes. Please click on the given <a href="{{link}}">Link</a> to moderate the request.
          </p>
          </br>
          <p>Candidate Name: {{name}}</p>
          <p>Email: {{email}}</p>
        `,
        SubjectPart: 'New Profile Moderation',
      },
    });

  const createTemplateCommand = updateNewProfileTemplateCommand();
  try {
    await client.send(createTemplateCommand);
  } catch (err) {
    throw Error(err);
  }
};

export const reportAndBlockUserEmailTemplate = async () => {
  const TEMPLATE_NAME = 'HEAVENLYMATCH_REPORT_AND_BLOCK_USER_TEMPLATE';

  const createReportAndBlockTemplateCommand = () =>
    new UpdateTemplateCommand({
      Template: {
        TemplateName: TEMPLATE_NAME,
        HtmlPart: `
        <p>As-salamu alaykum </p>
          <p>
          A new candidate has been reported on Heavenly Match and requires a review for action purposes. Please click on the given <a href="{{link}}">Link</a> to moderate the request.
          </p>
          </br>
          <p>Reported Candidate Name: {{name}}</p>
          <p>Reported Candidate Email: {{email}}</p>
          <p>Reported By: {{reportedBy}}</p>
        `,
        SubjectPart: 'New Report Submitted',
      },
    });

  const createTemplateCommand = createReportAndBlockTemplateCommand();
  try {
    await client.send(createTemplateCommand);
  } catch (err) {
    throw Error(err);
  }
};
