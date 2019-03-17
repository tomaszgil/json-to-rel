import fs from 'fs';
import path from 'path';

const verifyArgs = (args) => {
  if (!args.input) {
    return createErrorResult('You have to specify input file.');
  }
  if (!fs.existsSync(args.input)) {
    return createErrorResult(`File "${args.input}" does not exist.`);
  }
  if (!fs.lstatSync(args.input).isFile()) {
    return createErrorResult(`"${args.input}" is not a file.`);
  }
  if (path.extname(args.input).toLowerCase() !== '.json') {
    return createErrorResult(`"${args.input}" is not a JSON file.`);
  }
  if (!args.output) {
    return createErrorResult('You have to specify output directory.');
  }
  if (!fs.existsSync(args.output)) {
    return createErrorResult(`Directory "${args.output}" does not exist.`);
  }
  if (!fs.lstatSync(args.output).isDirectory()) {
    return createErrorResult(`"${args.output}" is not a directory.`);
  }
  if (!args.mode) {
    return createErrorResult('You have to specify mode ("ddl" or "csv").');
  }
  if (args.mode.toLowerCase() !== 'ddl' && args.mode.toLowerCase() !== 'csv') {
    return createErrorResult(`Invalid mode "${args.mode}".`);
  }

  return createValidResult();
}

const createErrorResult = (errorMessage) => {
  return {
    isValid: false,
    error: `error: ${errorMessage}`,
  };
}

const createValidResult = () => {
  return { 
    isValid: true,
    error: '',
  };
}

export default verifyArgs;