import type { NextFunction, Request, Response } from "express";
import { TraversalError } from "arktype"; // for staging

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(`Error in ${req.method} ${req.url}`, err.stack);
  if (err instanceof TraversalError) {
    const errMessages = err.message.split("\n  • ").filter(Boolean);
    res
      .status(400)
      .send({ status: false, message: errMessages[0], data: null });
    return;
  }

  res.status(500).send({
    status: false,
    message: err.message || "Something went wrong, please try again!",
    data: null,
  });
}

export function notFoundHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(404).send({ status: false, message: "Not found", data: null });
}

process
  .on("unhandledRejection", (reason: any, promise: Promise<any>) => {
    console.error("Unhandled Rejection:", reason);
  })
  .on("uncaughtException", (err: Error, origin: string) => {
    console.error("Uncaught Exception:", err);
    process.exit(1);
  });
