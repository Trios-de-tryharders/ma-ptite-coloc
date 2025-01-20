import express from "express";

const errorHandler = (err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log(err);

  const statusCode = err.statusCode || 500;
  const errorDetails = {
    statusCode,
    errorCode: err.code || "INTERNAL_SERVER_ERROR",
    message: err.message || "An unexpected error occurred",
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    path: req.path,
    method: req.method,
    timestamp: new Date().toISOString(),
  };

  res.status(statusCode).json(errorDetails);
}

export default errorHandler;