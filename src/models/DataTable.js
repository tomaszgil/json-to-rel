import Table from './Table';

class Decorator extends Table {
  constructor(component) {
    super();
    this.component = component;
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
    const header = super.toCSV();
    const values = this.data
      .map(a => `\t${a.toDDL()}`)
      .join(',\n');
    return `${header}${values}`;
  }
}

export default DataTable;
