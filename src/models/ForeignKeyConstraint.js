import config from '../helpers/config';

export default class ForeignKeyConstraint {
  static get label() {
    return 'REFERENCES';
  }

  static getAttributeName(tableName) {
    const { surrogatePrimaryKeyName } = config;
    return `${tableName}${surrogatePrimaryKeyName}`;
  }

  constructor(table, field) {
    this.table = table;
    this.field = field;
  }

  toSQL() {
    return `${this.constructor.label} ${this.table}(${this.field})`;
  }
}
