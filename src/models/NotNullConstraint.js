export default class NotNullConstraint {
  static get label() {
    return 'NOT NULL';
  }

  toSQL() {
    return this.constructor.label;
  }
}
