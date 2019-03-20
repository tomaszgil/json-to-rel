export default class ForeignKeyConstraint {
  static get label() {
    return 'FOREIGN KEY REFERENCES';
  }

  constructor(table, field) {
    this.table = table;
    this.field = field;
  }

  toDDL() {
    return `${this.constructor.label} ${this.table}(${this.field})`;
  }
}
