import Attribute from './Attribute';
import { DB_TYPE_NUMBER } from '../core/dbTypes';
import PrimaryKeyConstraint from './PrimaryKeyConstraint';
import NotNullConstraint from './NotNullConstraint';

import { surrogatePrimaryKeyName } from '../../config.json';

class Table {
  constructor(name) {
    this.name = name;
    this.attributes = [];
    this.primaryKey = Table.generatePrimaryKey();
    this.attributes.unshift(this.primaryKey);
  }

  setAttributes(attributes) {
    this.attributes = [this.primaryKey, ...attributes];
  }

  static generatePrimaryKey() {
    const primaryKey = new Attribute(
      surrogatePrimaryKeyName,
      DB_TYPE_NUMBER,
      {
        primaryKey: new PrimaryKeyConstraint(),
        notNull: new NotNullConstraint(),
      },
    );

    return primaryKey;
  }

  toDDL() {
    const attrString = this.attributes
      .map(a => `\t${a.toDDL()}`)
      .join(',\n');
    return `CREATE TABLE ${this.name} (\n${attrString}\n);`;
  }

  toCSV() {
    return '';
  }
}

export default Table;
