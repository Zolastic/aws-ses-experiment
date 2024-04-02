"use client";

import React from "react";
import { Button } from "./ui/button";
import { processEmail } from "@/lib/email-utils";
import { toast } from "sonner";
import { env } from "@/env";

type Props = {
  recipients: string[];
};

const SendEmailButton = ({ recipients }: Props) => {
  const sender = env.NEXT_PUBLIC_SENDER_EMAIL;
  const subject = "Hello from AWS SES";
  const content = "<h1>Hello from AWS SES APP</h1>";

  const handleSendEmail = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();

    try {
      toast.promise(
        processEmail({
          sender,
          recipients,
          subject,
          content,
        }),
        {
          loading: "Sending email...",
          success: "Email sent!",
          error: "Failed to send email",
        },
      );
    } catch (error) {
      console.error(error);
    }
  };

  return <Button onClick={handleSendEmail}>Send Email</Button>;
};

export default SendEmailButton;
