import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    DATABASE_URL: z
      .string()
      .url()
      .refine(
        (str) => !str.includes("YOUR_MYSQL_URL_HERE"),
        "You forgot to change the default URL",
      ),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    AWS_SES_ACCESS_KEY_ID: z.string(),
    AWS_SES_SECRET_ACCESS_KEY: z.string(),
    AWS_SES_REGION: z.string(),
    SENDER_EMAIL: z.string(),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string(),
    NEXT_PUBLIC_AWS_SES_ACCESS_KEY_ID: z.string(),
    NEXT_PUBLIC_AWS_SES_SECRET_ACCESS_KEY: z.string(),
    NEXT_PUBLIC_AWS_SES_REGION: z.string(),
    NEXT_PUBLIC_SENDER_EMAIL: z.string(),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,

    AWS_SES_ACCESS_KEY_ID: process.env.AWS_SES_ACCESS_KEY_ID,
    AWS_SES_SECRET_ACCESS_KEY: process.env.AWS_SES_SECRET_ACCESS_KEY,
    AWS_SES_REGION: process.env.AWS_SES_REGION,
    SENDER_EMAIL: process.env.SENDER_EMAIL,

    NEXT_PUBLIC_AWS_SES_ACCESS_KEY_ID:
      process.env.NEXT_PUBLIC_AWS_SES_ACCESS_KEY_ID,
    NEXT_PUBLIC_AWS_SES_SECRET_ACCESS_KEY:
      process.env.NEXT_PUBLIC_AWS_SES_SECRET_ACCESS_KEY,
    NEXT_PUBLIC_AWS_SES_REGION: process.env.NEXT_PUBLIC_AWS_SES_REGION,
    NEXT_PUBLIC_SENDER_EMAIL: process.env.NEXT_PUBLIC_SENDER_EMAIL,

    // NEXT_PUBLIC_CLIENTVAR: process.env.NEXT_PUBLIC_CLIENTVAR,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined.
   * `SOME_VAR: z.string()` and `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
});
