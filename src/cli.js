#!/usr/bin/env node

import args from './helpers/arguments';
import saveResult from './helpers/saveResult';

import parseJson from './processing/parseJson';
import preprocess from './processing/preprocess';
import createJsonSchema from './processing/createJsonSchema';
import createResult from './processing/createResult';
import Logger, { LogMessage } from './helpers/Logger';

Logger.log(new LogMessage('Application started.'));

const json = preprocess(parseJson(args.input));
const schema = createJsonSchema(json);
const result = createResult(schema, json, args.mode);

saveResult(result, args.mode, args.output);

Logger.log(new LogMessage('Application finished.\n'));
