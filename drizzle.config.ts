import { defineConfig } from "drizzle-kit";

import { credentials } from "./src/configs/credentials.config.js";

export default defineConfig({
  dialect: "postgresql",
  schema: "./dist/models",
  out: "./drizzle",
  dbCredentials: {
    // url: "",
    host: credentials.pgHost!,
    port: credentials.pgPort!,
    user: credentials.pgUser!,
    password: credentials.pgPassword!,
    database: credentials.pgDatabase!,

    ssl: { rejectUnauthorized: false },
  },
});
