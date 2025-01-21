import express from "express";
import fs from "fs";
import path from "path";

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

  // Log error to file
  const logFilePath = path.join(__dirname, '../logs/errors.txt');
  const logMessage = `${(req as any).decoded?.user ? (req as any).decoded.user.id : 'Not connected'} - ${errorDetails.timestamp} - ${errorDetails.method} ${errorDetails.path} - ${errorDetails.statusCode} - ${errorDetails.message}\n`;
  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) console.error("Failed to write to log file:", err);
  });

  res.status(statusCode).json(errorDetails);
}

export default errorHandler;