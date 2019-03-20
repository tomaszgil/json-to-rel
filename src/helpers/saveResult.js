import fs from 'fs';
import { MODE_CSV, MODE_DDL } from '../core/outputModes';
import { outputFileName } from '../../config.json';

const saveResult = (tables, mode, path) => {
  switch (mode) {
    case MODE_CSV: break;
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
