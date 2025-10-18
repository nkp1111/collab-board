import dotenv from "dotenv";

dotenv.config();

export const credentials = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "secret",
  postgresURI:
    process.env.POSTGRES_URI ||
    "postgres://user:password@localhost:5432/dbname",
};
