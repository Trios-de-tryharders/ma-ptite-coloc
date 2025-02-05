import * as fs from 'fs';
import * as path from 'path';

const logFilePath = path.join(__dirname, '../logs/logs.txt');
const paymentLogFilePath = path.join(__dirname, '../logs/payment.txt');

export function writeLog(message: string): void {
    const logMessage = `${new Date().toISOString()} - ${message}\n`;
    fs.appendFile(logFilePath, logMessage, (err) => {
        if (err) {
            console.error('Failed to write to log file:', err);
        }
    });
}

export function writePaymentLog(message: string): void {
    const logMessage = `${new Date().toISOString()} - ${message}\n`;
    fs.appendFile(paymentLogFilePath, logMessage, (err) => {
        if (err) {
            console.error('Failed to write to log file:', err);
        }
    });
}