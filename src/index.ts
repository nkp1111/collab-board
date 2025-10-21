import express from "express";
import cors from "cors";
import type { Response } from "express";

import type { TTokenUser } from "./utils/common-interface.utils.js";
import { credentials } from "./configs/credentials.config.js";
import routes from "./services/route.js";
import "./configs/db.config.js";
import { db } from "./configs/db.config.js";
import { swaggerDocs } from "./configs/swagger.config.js";
import {
  notFoundHandler,
  errorHandler,
} from "./middlewares/error.middleware.js";

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
swaggerDocs(app);

app.get("/health", (req, res: Response) => {
  res.status(200).send("OK");
});

app.use("/api/v1", routes);

app.use(notFoundHandler);
app.use(errorHandler);

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

declare global {
  namespace express {
    interface Request {
      user?: TTokenUser;
    }
  }
}
