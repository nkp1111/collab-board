import { Express } from "express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import { credentials } from "./credentials.config.js";

// Current file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Collab Board API",
      version: "1.0.0",
      description: "...",
    },
    servers: [
      {
        url: "http://localhost:" + credentials.port,
      },
    ],
  },
  apis: [path.join(__dirname, "../services/**/*.ts")], // or .ts depending on your setup
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);

export const swaggerDocs = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
