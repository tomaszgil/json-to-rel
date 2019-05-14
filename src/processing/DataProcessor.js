import DataTable from '../models/DataTable';
import ForeignKeyConstraint from '../models/ForeignKeyConstraint';

import isObject from '../helpers/isObject';
import config from '../helpers/config';

const { rootTableName } = config;

class SchemaProcessor {
  constructor(tables, json) {
    this.json = json;
    this.dataTables = SchemaProcessor.createDataTables(tables);
  }

  static createDataTables(tables) {
    return tables.map(table => new DataTable(table));
  }

  findTableByName(name) {
    return this.dataTables.find(table => table.name === name);
  }

  process() {
    this.processNode(rootTableName, null, null, this.json);
    return this.dataTables;
  }

  processNode(name, parentName, parentId, json) {
    if (isObject(json)) {
      const table = this.findTableByName(DataTable.createTableName(name, parentName));
      const { id, name: createdName } = table;
      const values = {};

      Object.keys(json).forEach((key) => {
        values[key] = this.processNode(key, createdName, id, json[key]);
      });

      if (parentName && parentId) {
        const fkName = ForeignKeyConstraint.getAttributeName(parentName);
        values[fkName] = parentId;
      }

      table.createRecord(values);

      return id;
    }

    if (Array.isArray(json)) {
      json.forEach(value => this.processNode(name, parentName, parentId, value));
      return null;
    }

    if (typeof json === 'boolean') {
      return json ? 1 : 0;
    }

    return json;
  }
}

export default SchemaProcessor;
