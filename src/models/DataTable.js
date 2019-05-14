import Table from './Table';
import config from '../helpers/config';

const { csvDelimiters } = config;

class Decorator extends Table {
  constructor(component) {
    super();
    this.component = component;

    Object.getOwnPropertyNames(component)
      .forEach((name) => {
        this[name] = component[name];
      });
  }
}

class DataTable extends Decorator {
  constructor(table, data) {
    super(table);
    this.data = data || [];
    this.id = 1;
  }

  createRecord(values) {
    const record = this.attributes.map((attr) => {
      if (attr.constraints.primaryKey) {
        const { id } = this;
        this.id++;
        return id;
      }

      return (attr.name in values) ? values[attr.name] : null;
    });

    this.data.push(record);
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
