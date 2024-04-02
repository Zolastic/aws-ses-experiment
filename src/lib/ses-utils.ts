import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
// import { SNSClient, SubscribeCommand } from "@aws-sdk/client-sns";
import { env } from "@/env";

const sesClient: SESClient = new SESClient({
  region: env.NEXT_PUBLIC_AWS_SES_REGION,
  credentials: {
    accessKeyId: env.NEXT_PUBLIC_AWS_SES_ACCESS_KEY_ID,
    secretAccessKey: env.NEXT_PUBLIC_AWS_SES_SECRET_ACCESS_KEY,
  },
});

// const snsClient = new SNSClient({
//     region: env.AWS_SES_REGION,
//     credentials: {
//         accessKeyId: env.AWS_SES_ACCESS_KEY_ID,
//         secretAccessKey: env.AWS_SES_SECRET_ACCESS_KEY,
//     },
// });

// // Set up SNS topic ARN for bounce notifications
// const snsTopicArn = "arn:aws:sns:us-east-1:460439186236:inc-aws-ses:d4791a73-9c72-4d1d-85c4-33ca16345dd7:inc-aws-ses";

// // Subscribe to the SNS topic
// const subscribeToTopic = async (): Promise<void> => {
//     try {
//         await snsClient.send(new SubscribeCommand({
//             Protocol: 'email',
//             Endpoint: 'thinzarhninyu.17@gmail.com', // Replace with your email address
//             TopicArn: snsTopicArn,
//         }));
//     } catch (error) {
//         console.error("Error subscribing to SNS topic:", error);
//         throw error;
//     }
// };

// // Call this function once to subscribe to the SNS topic
// subscribeToTopic();

interface EmailParams {
  Source: string;
  Destination: {
    ToAddresses: string[];
  };
  Message: {
    Subject: { Data: string };
    Body: { Html: { Data: string } };
  };
}

const sendEmail = async (params: EmailParams): Promise<void> => {
  try {
    await sesClient.send(new SendEmailCommand(params));
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

// Lambda function to handle SNS notifications
// export const handler = async (event: any): Promise<void> => {
//     const snsMessage = JSON.parse(event.Records[0].Sns.Message);
//     const bounce = snsMessage.bounce;

//     if (bounce) {
//         const bounceRecipients = bounce.bouncedRecipients;
//         if (bounceRecipients && bounceRecipients.length > 0) {
//             const failedEmailAddresses = bounceRecipients.map((recipient: any) => recipient.emailAddress);
//             console.log("Failed email addresses:", failedEmailAddresses);
//         }
//     }
// };

export { sendEmail };
