import * as fs from 'fs';
import * as path from 'path';

const logFilePath = path.join(__dirname, '../logs/logs.txt');

export function writeLog(message: string): void {
    const logMessage = `${new Date().toISOString()} - ${message}\n`;
    fs.appendFile(logFilePath, logMessage, (err) => {
        if (err) {
            console.error('Failed to write to log file:', err);
        }
    });
}