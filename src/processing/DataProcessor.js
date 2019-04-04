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

class SchemaProcessor {
  constructor(tables, json) {
    this.tables = tables;
    this.json = json;
    this.dataTables = [];
  }

  process() {
    return this.dataTables;
  }
}

export default SchemaProcessor;
