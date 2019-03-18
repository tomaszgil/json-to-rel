export class PrimaryKey {
  static get label() {
    return 'PRIMARY KEY';
  }

  toSQL() {
    return this.constructor.label;
  }
}

export class ForeignKey {
  static get label() {
    return 'FOREIGN KEY REFERENCES';
  }

  constructor(table, field) {
    this.table = table;
    this.field = field;
  }

  toSQL() {
    return `${this.constructor.label} ${this.table}(${this.field})`;
  }
}

export class NotNull {
  static get label() {
    return 'NOT NULL';
  }

  toSQL() {
    return this.constructor.label;
  }
}
