#!/usr/bin/env node

// import util from 'util';
import { logLevel, logFile } from '../config';
import Logger from './helpers/Logger';
import LogMessage from './helpers/LogMessage';
import args from './helpers/arguments';
import saveResult from './helpers/saveResult';

import parseJson from './processing/parseJson';
import createJsonSchema from './processing/createJsonSchema';
import SchemaProcessor from './processing/SchemaProcessor';

const logger = new Logger(args.logging, logFile, logLevel);
const json = parseJson(args.input);
const schema = createJsonSchema(json);
const tables = new SchemaProcessor(schema, json).process();

saveResult(tables, args.mode, args.output);
// console.log(util.inspect(schema, { showHidden: false, depth: null }));
