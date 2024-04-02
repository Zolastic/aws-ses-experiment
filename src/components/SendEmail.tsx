"use client";

import React, { useState } from "react";
import { Input } from "./ui/input";
import SendEmailButton from "./SendEmailButton";

const SendEmail = () => {
  const [destination, setDestination] = useState<{ ToAddresses: string[] }>({
    ToAddresses: [],
  });

  return (
    <div className="flex space-x-[8px]">
      <Input
        type="email"
        placeholder="Email Address"
        className="w-96"
        value={destination.ToAddresses[0] ?? ""}
        onChange={(event) =>
          setDestination({ ToAddresses: [event.target.value] })
        }
      />
      <SendEmailButton Destination={destination} />
    </div>
  );
};

export default SendEmail;
