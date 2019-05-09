export default class NullConstraint {
  static get label() {
    return 'NULL';
  }

  toSQL() {
    return this.constructor.label;
  }
}
