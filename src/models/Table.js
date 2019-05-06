import Attribute from './Attribute';
import { DB_TYPE_NUMBER } from '../core/dbTypes';
import PrimaryKeyConstraint from './PrimaryKeyConstraint';
import NotNullConstraint from './NotNullConstraint';

import Logger, { LogMessage } from '../helpers/Logger';
import { surrogatePrimaryKeyName, csvDelimiters } from '../../config.json';

class Table {
  constructor(name) {
    Logger.log(new LogMessage(`Table ${name} created.`, 1));

    if (name.length > 64) {
      Logger.log(new LogMessage('Maximum table name length exceeded.', 2));
    }

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
    const { col } = csvDelimiters;
    return this.attributes
      .map(a => a.toCSV())
      .join(col);
  }
}

export default Table;
