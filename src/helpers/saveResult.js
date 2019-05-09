import fs from 'fs';
import { MODE_CSV, MODE_SQL } from '../core/outputModes';
import { outputFileName } from '../../config.json';

const saveResult = (tables, mode, path) => {
  switch (mode) {
    case MODE_CSV: {
      tables.forEach((table) => {
        const result = table.toCSV();
        fs.writeFileSync(`${path}/${table.name}.csv`, result);
      });
      break;
    }
    case MODE_SQL: {
      const result = tables
        .map(table => table.toSQL())
        .join('\n');
      fs.writeFileSync(`${path}/${outputFileName}`, result);
      break;
    }
    default: break;
  }
};

export default saveResult;
