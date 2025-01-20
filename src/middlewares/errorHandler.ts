import express from "express";

const errorHandler = (err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log(err);
  
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    statusCode,
    errorCode: err.code || "INTERNAL_SERVER_ERROR",
    message: err.message || "An unexpected error occurred",
  });
}

export default errorHandler;