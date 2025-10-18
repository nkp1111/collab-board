import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import { credentials } from "./credentials.config.js";

const pool = new Pool({
  connectionString: credentials.postgresURI,
  ssl: {
    rejectUnauthorized: false, // allow self-signed certs
  },
});

// Create Drizzle instance
export const db = drizzle(pool);
