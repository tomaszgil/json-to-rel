import SchemaProcessor from './SchemaProcessor';
import DataProcessor from './DataProcessor';
import { MODE_CSV } from '../core/outputModes';

const createResult = (schema, json, mode) => {
  const tables = new SchemaProcessor(schema, json).process();

  if (mode === MODE_CSV) {
    const dataTables = new DataProcessor(tables, json).process();
    return dataTables;
  }

  return tables;
};

export default createResult;
