"use client";

import { sendEmail } from "@/lib/ses-utils";
import React from "react";
import { Button } from "./ui/button";

type Props = {
  Destination: {
    ToAddresses: string[];
  };
};

const SendEmailButton = ({ Destination }: Props) => {
  const Source = "honhattienlul@gmail.com";
  const Message = {
    Subject: { Data: "Hello from AWS SES" },
    Body: { Html: { Data: "<h1>Hello from AWS SES</h1>" } },
  };

  const handleSendEmail = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();

    try {
      await sendEmail({
        Source,
        Destination,
        Message,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return <Button onClick={handleSendEmail}>Send Email</Button>;
};

export default SendEmailButton;
