import { surrogatePrimaryKeyName } from '../../config.json';

export default class ForeignKeyConstraint {
  static get label() {
    return 'FOREIGN KEY REFERENCES';
  }

  static getAttributeName(tableName) {
    return `${tableName}${surrogatePrimaryKeyName}`;
  }

  constructor(table, field) {
    this.table = table;
    this.field = field;
  }

  toDDL() {
    return `${this.constructor.label} ${this.table}(${this.field})`;
  }
}
