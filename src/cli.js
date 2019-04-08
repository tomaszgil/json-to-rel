#!/usr/bin/env node

// import util from 'util';
import args from './helpers/arguments';
import saveResult from './helpers/saveResult';

import parseJson from './processing/parseJson';
import preprocess from './processing/preprocessing';
import createJsonSchema from './processing/createJsonSchema';
import SchemaProcessor from './processing/SchemaProcessor';
import Logger, { LogMessage } from './helpers/Logger';

Logger.log(new LogMessage('Processing started.'));

const json = parseJson(args.input);
preprocess(json);
const schema = createJsonSchema(json);
const tables = new SchemaProcessor(schema, json).process();

Logger.log(new LogMessage('Processing finished.'));

saveResult(tables, args.mode, args.output);
// console.log(util.inspect(schema, { showHidden: false, depth: null }));
