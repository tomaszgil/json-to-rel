import Table from './Table';
import { csvDelimiters } from '../../config.json';

class Decorator extends Table {
  constructor(component) {
    super();
    this.component = component;

    Object.getOwnPropertyNames(component)
      .forEach((name) => {
        this[name] = component[name];
      });
  }

  setAttributes(attributes) {
    this.component.setAttributes(attributes);
  }

  static generatePrimaryKey() {
    return Table.generatePrimaryKey();
  }

  toDDL() {
    return this.component.toDDL();
  }
}

class DataTable extends Decorator {
  constructor(table, data) {
    super(table);
    this.data = data || [];
  }

  toCSV() {
    const { row, col } = csvDelimiters;
    const header = super.toCSV();
    const values = this.data
      .map(dataRow => dataRow.join(col))
      .join(row);
    return `${header}${row}${values}`;
  }
}

export default DataTable;
