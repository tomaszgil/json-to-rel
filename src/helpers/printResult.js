import { MODE_CSV, MODE_DDL } from '../core/outputModes';

const printResult = (mode, tables) => {
  switch (mode) {
    case MODE_CSV:
      break;
    case MODE_DDL:
      tables.map(table => console.log(table.toDDL()));
      break;
    default:
      break;
  }
};

export default printResult;
