import { sendEmail } from "@/lib/ses-utils";

interface EmailData {
  sender: string;
  recipients: string[];
  subject: string;
  content: string;
}

const processEmail = (emailData: EmailData) => {
  const { sender, recipients, subject, content } = emailData;

  const params = {
    Source: sender,
    Destination: {
      ToAddresses: recipients,
    },
    Message: {
      Subject: { Data: subject },
      Body: { Html: { Data: content } },
    },
  };

  return sendEmail(params);
};

export { processEmail };
