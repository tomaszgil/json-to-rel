#!/usr/bin/env node

// import util from 'util';
import args from './helpers/arguments';
// import logger from './helpers/logger';
import saveResult from './helpers/saveResult';

import parseJson from './functions/parseJson';
import createJsonSchema from './functions/createJsonSchema';
import createTables from './functions/createTables';

const json = parseJson(args.input);
const schema = createJsonSchema(json);
const tables = createTables(schema, json);

saveResult(tables, args.mode, args.output);
// console.log(util.inspect(schema, { showHidden: false, depth: null }));
