import DataTable from '../models/DataTable';
import ForeignKeyConstraint from '../models/ForeignKeyConstraint';

import isObject from '../helpers/isObject';
import { rootTableName } from '../../config.json';
import createTableName from '../helpers/createTableName';

class SchemaProcessor {
  constructor(tables, json) {
    this.json = json;
    this.dataTables = SchemaProcessor.createDataTables(tables);
    this.dataTables.forEach(table => console.log(table.name));
  }

  static createDataTables(tables) {
    return tables.map(table => new DataTable(table));
  }

  findTableByName(name) {
    return this.dataTables.find(table => table.name === name);
  }

  process() {
    this.processNode(rootTableName, null, this.json);
    return this.dataTables;
  }

  processNode(name, parentTable, json) {
    let parentName;
    let parentKey;

    if (parentTable) {
      parentName = parentTable.name;
      parentKey = parentTable.primaryKey;
    }

    if (isObject(json)) {
      console.log(createTableName(name, parentName));
      const table = this.findTableByName(createTableName(name, parentName));
      const { id } = table;
      const values = {};

      Object.keys(json).forEach((key) => {
        values[key] = this.processNode(key, table, json[key]);
      });

      if (parentName && parentKey) {
        const fkName = ForeignKeyConstraint.getAttributeName(parentName);
        values[fkName] = parentKey;
      }

      table.createRecord(values);

      return id;
    }

    if (Array.isArray(json)) {
      json.forEach(value => this.processNode(name, parentTable, value));
      return null;
    }

    if (typeof json === 'boolean') {
      return json ? 1 : 0;
    }

    return json;
  }
}

export default SchemaProcessor;
