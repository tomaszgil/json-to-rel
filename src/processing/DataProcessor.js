import DataTable from '../models/DataTable';

class SchemaProcessor {
  constructor(tables, json) {
    this.json = json;
    this.dataTables = SchemaProcessor.createDataTables(tables);
  }

  static createDataTables(tables) {
    return tables.map(table => new DataTable(table));
  }

  process() {
    return this.dataTables;
  }
}

export default SchemaProcessor;
