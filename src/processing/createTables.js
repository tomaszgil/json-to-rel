import processNode from './processNode';

import { rootTableName } from '../../config.json';

const createTables = (schema, json) => {
  const { tables } = processNode(rootTableName, null, null, schema, json, []);

  return tables;
};

export default createTables;
