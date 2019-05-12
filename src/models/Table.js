import Attribute from './Attribute';
import { DB_TYPE_INTEGER } from '../core/dbTypes';
import PrimaryKeyConstraint from './PrimaryKeyConstraint';
import NotNullConstraint from './NotNullConstraint';

import Logger, { LogMessage } from '../helpers/Logger';
import { surrogatePrimaryKeyName, csvDelimiters } from '../../config.json';
import createTableName from '../helpers/createTableName';
import { MAX_TABLE_NAME_LENGTH } from '../core/dbConstants';

class Table {
  constructor(name, path) {
    this.name = createTableName(name, path);

    Logger.log(new LogMessage(`Table ${this.name} created.`, 1));
    if (this.name.length > MAX_TABLE_NAME_LENGTH) {
      Logger.log(new LogMessage('Maximum table name length exceeded.', 2));
    }

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
