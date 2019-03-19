import generateName from '../helpers/generateName';
import Table from '../models/Table';
import Attribute from '../models/Attribute';
import { NotNullConstraint, ForeignKeyConstraint } from '../models/Constraint';

import {
  DB_TYPE_VARCHAR, DB_TYPE_NUMBER,
} from '../core/dbTypes';
import {
  TYPE_OBJECT, TYPE_STRING, TYPE_ARRAY, TYPE_NUMBER,
} from '../core/schemaTypes';

const tables = [];

const processNode = (name, req, schema, json) => {
  const currentName = name || generateName();

  if (schema.type === TYPE_OBJECT) {
    const { properties } = schema;
    const attributes = Object.keys(properties)
      .map(key => processNode(key, true, properties[key], json));
    const table = new Table(currentName, attributes);
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
    const { required, properties } = schema.items;
    const attributes = Object.keys(properties)
      .map(key => processNode(key, required.includes(key), properties[key], json));
    const table = new Table(currentName, attributes);
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
  processNode(null, null, schema, json);

  return tables;
};

export default createTables;
