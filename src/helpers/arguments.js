import program from 'commander';
import handleError from './errors';
import verifyArgs from './verifyArgs';

program
  .version('1.0')
  .option('-i, --input <file>', 'path to input JSON file')
  .option('-m, --mode <mode>', 'program mode: "ddl" or "csv"')
  .option('-o, --output <dir>', 'path to output directory')
  .on('--help', () => {
    console.log('');
    console.log('Example:');
    console.log('  $ json-to-relational -i ./input.json -m ddl -o ./output');
  })
  .parse(process.argv);

try {
  verifyArgs(program);
} catch (e) {
  handleError(e);
}

export default program;
