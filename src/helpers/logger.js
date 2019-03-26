import path from 'path';
import fs from 'fs';

class Logger {
 constructor (enabled, file, logLevel) {
    this.enabled = enabled;
    this.logLevel = isNaN(logLevel) ? 0 : logLevel;

    if (file) {
      this.logToFile = true;
      this.file = path.join(__dirname, '../..', file);
    } else {
      this.logToFile = false;
      this.file = '';
    }
  }

  log(message) {
    if (!this.enabled || this.logLevel > message.logLevel) {
      return; 
    }

    this.writeToConsole(message);

    if (this.logToFile) {
      this.writeToFile(message);
    }
  }

  prepareMessage(message) {
    return `${new Date().toLocaleString()} - ${message.logLevel} - ${message.text}\n`;
  }

  writeToConsole(message) {
    console.log(this.prepareMessage(message));
  }
  
  writeToFile(message) {
    fs.appendFileSync(this.file, this.prepareMessage(message));
  }
}

export default Logger;