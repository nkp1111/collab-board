import express from "express";
import cors from "cors";
import type { Response } from "express";

import type { TTokenUser } from "./utils/common-interface.utils.js";
import { credentials } from "./configs/credentials.config.js";
import routes from "./services/route.js";
import "./configs/db.config.js";
import { db } from "./configs/db.config.js";

const app = express();
const PORT = credentials.port;

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));

app.get("/health", (req, res: Response) => {
  res.status(200).send("OK");
});

app.use("/api/v1", routes);

async function startServer() {
  try {
    await db.execute("SELECT 1"); // test DB connection
    console.log("Database connected ✅");

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (err) {
    console.error("Database connection failed ❌", err);
    process.exit(1); // stop server if DB not reachable
  }
}

startServer();

declare global {
  namespace express {
    interface Request {
      user?: TTokenUser;
    }
  }
}
