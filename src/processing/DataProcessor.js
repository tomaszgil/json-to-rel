import DataTable from '../models/DataTable';
import ForeignKeyConstraint from '../models/ForeignKeyConstraint';

import isObject from '../helpers/isObject';
import { rootTableName } from '../../config.json';

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
    this.processNode(rootTableName, this.json);
    return this.dataTables;
  }

  processNode(name, json, parentName, parentKey) {
    if (isObject(json)) {
      const table = this.findTableByName(name);
      const { id } = table;
      const values = {};

      Object.keys(json).forEach((key) => {
        values[key] = this.processNode(key, json[key], name, id);
      });

      if (parentName && parentKey) {
        const fkName = ForeignKeyConstraint.getAttributeName(parentName);
        values[fkName] = parentKey;
      }

      table.createRecord(values);

      return id;
    }

    if (Array.isArray(json)) {
      json.forEach(value => this.processNode(name, value, parentName, parentKey));
      return null;
    }

    if (typeof json === 'boolean') {
      return json ? 1 : 0;
    }

    return json;
  }
}

export default SchemaProcessor;
