import Attribute from './Attribute';
import { DB_TYPE_INTEGER } from '../core/dbTypes';
import PrimaryKeyConstraint from './PrimaryKeyConstraint';
import NotNullConstraint from './NotNullConstraint';

import { surrogatePrimaryKeyName, csvDelimiters } from '../../config.json';

class Table {
  constructor(name) {
    this.name = name;
    this.primaryKey = Table.generatePrimaryKey();
    this.attributes = [this.primaryKey];
  }

  setAttributes(attributes) {
    this.attributes = [this.primaryKey, ...attributes];
  }

  static generatePrimaryKey() {
    const primaryKey = new Attribute(
      surrogatePrimaryKeyName,
      DB_TYPE_INTEGER,
      {
        primaryKey: new PrimaryKeyConstraint(),
        notNull: new NotNullConstraint(),
      },
    );

    return primaryKey;
  }

  toSQL() {
    const attrString = this.attributes
      .map(a => `\t${a.toSQL()}`)
      .join(',\n');
    return `CREATE TABLE ${this.name} (\n${attrString}\n);`;
  }

  toCSV() {
    const { col } = csvDelimiters;
    return this.attributes
      .map(a => a.toCSV())
      .join(col);
  }
}

export default Table;
