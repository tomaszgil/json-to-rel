import fs from 'fs';
import { MODE_CSV, MODE_DDL } from '../core/outputModes';
import { outputFileName } from '../../config.json';
import Logger, { LogMessage } from './Logger';

const saveResult = (tables, mode, path) => {
  Logger.log(new LogMessage(`Saving result (path: '${path}').`));

  switch (mode) {
    case MODE_CSV: {
      tables.forEach((table) => {
        const result = table.toCSV();
        fs.writeFileSync(`${path}/${table.name}.csv`, result);
      });
      break;
    }
    case MODE_DDL: {
      const result = tables
        .map(table => table.toDDL())
        .join('\n');
      fs.writeFileSync(`${path}/${outputFileName}`, result);
      break;
    }
    default: break;
  }
};

export default saveResult;
