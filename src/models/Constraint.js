export class PrimaryKeyConstraint {
  static get label() {
    return 'PRIMARY KEY';
  }

  toDDL() {
    return this.constructor.label;
  }
}

export class ForeignKeyConstraint {
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

export class NotNullConstraint {
  static get label() {
    return 'NOT NULL';
  }

  toDDL() {
    return this.constructor.label;
  }
}

export class NullConstraint {
  static get label() {
    return 'NULL';
  }

  toDDL() {
    return this.constructor.label;
  }
}
