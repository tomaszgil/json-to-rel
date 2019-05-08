import SchemaProcessor from './SchemaProcessor';
import DataProcessor from './DataProcessor';
import { MODE_CSV } from '../core/outputModes';
import Logger, { LogMessage } from '../helpers/Logger';

const createResult = (schema, json, mode) => {
  Logger.log(new LogMessage(`Processing (mode '${mode}').`));
  const tables = new SchemaProcessor(schema).process();

  if (mode === MODE_CSV) {
    const dataTables = new DataProcessor(tables, json).process();
    return dataTables;
  }

  return tables;
};

export default createResult;
