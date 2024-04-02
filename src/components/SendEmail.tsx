"use client";

import React, { useState } from "react";
import { Input } from "./ui/input";
import SendEmailButton from "./SendEmailButton";

const SendEmail = () => {
  const [recipients, setRecipients] = useState<string[]>([]);

  return (
    <div className="flex space-x-[8px]">
      <Input
        type="email"
        placeholder="Email Address"
        className="w-96"
        value={recipients}
        onChange={(event) => setRecipients([event.target.value])}
      />
      <SendEmailButton recipients={recipients} />
    </div>
  );
};

export default SendEmail;
