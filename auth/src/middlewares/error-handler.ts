import { BaseCustomError } from "@/errors/base-customer-error";
import { NextFunction, Request, Response } from "express";

const errorHandler = (err: Error, req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof BaseCustomError) {
    return res.sendStatus(err.getStatusCode());
  }
  return res.sendStatus(500);
};

export default errorHandler;
