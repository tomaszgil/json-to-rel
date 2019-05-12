export default class PrimaryKeyConstraint {
  static get label() {
    return 'PRIMARY KEY';
  }

  toSQL() {
    return this.constructor.label;
  }
}
