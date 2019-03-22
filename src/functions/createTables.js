import Table from '../models/Table';
import Attribute from '../models/Attribute';
import NotNullConstraint from '../models/NotNullConstraint';
import ForeignKeyConstraint from '../models/ForeignKeyConstraint';

import { rootTableName, surrogatePrimaryKeyName } from '../../config.json';

import {
  DB_TYPE_VARCHAR, DB_TYPE_NUMBER,
} from '../core/dbTypes';
import {
  TYPE_OBJECT, TYPE_STRING, TYPE_ARRAY, TYPE_NUMBER,
} from '../core/schemaTypes';

const tables = [];

const processNode = (name, req, parentTable, schema, json) => {
  if (schema.type === TYPE_OBJECT) {
    const table = new Table(name);
    const { properties } = schema;
    const attributes = Object.keys(properties)
      .map(key => processNode(key, true, table, properties[key], json))
      .filter(ret => ret);

    table.setAttributes(attributes);
    tables.push(table);

    return new Attribute(
      name,
      table.primaryKey.type,
      {
        notNull: req && new NotNullConstraint(),
        foreignKey: new ForeignKeyConstraint(
          table.name,
          table.primaryKey.name,
        ),
      },
    );
  }

  if (schema.type === TYPE_ARRAY) {
    const { primaryKey: parentKey, name: parentName } = parentTable;
    const table = new Table(name);
    const { required, properties } = schema.items;
    const attributes = Object.keys(properties)
      .map(key => processNode(key, required.includes(key), table, properties[key], json))
      .filter(ret => ret);

    attributes.unshift(new Attribute(
      `${parentName}${surrogatePrimaryKeyName}`,
      parentKey.type,
      {
        foreignKey: new ForeignKeyConstraint(parentName, parentKey.name),
        notNull: req && new NotNullConstraint(),
      },
    ));
    table.setAttributes(attributes);
    tables.push(table);

    return null;
  }

  if (schema.type === TYPE_NUMBER) {
    return new Attribute(name, DB_TYPE_NUMBER, {
      notNull: req && new NotNullConstraint(),
    });
  }

  if (schema.type === TYPE_STRING) {
    return new Attribute(name, DB_TYPE_VARCHAR, {
      notNull: req && new NotNullConstraint(),
    });
  }

  // String as a fallback
  return new Attribute(name, DB_TYPE_VARCHAR, {
    notNull: req && new NotNullConstraint(),
  });
};

const createTables = (schema, json) => {
  processNode(rootTableName, null, null, schema, json);

  return tables;
};

export default createTables;
