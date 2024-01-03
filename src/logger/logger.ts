import fs from 'fs';
import path from 'path';

class Logger {
  private logFilePath: string;

  constructor(logFileName: string) {
    this.logFilePath = path.join(__dirname, logFileName);
  }

  log(message: string): void {
    const timestamp = new Date().toISOString();
    const logMessage = `${timestamp} - ${message}\n`;

    fs.appendFile(this.logFilePath, logMessage, (err) => {
      if (err) {
        console.error('Failed to write to log file:', err);
      }
    });
  }
}

export default Logger;