import program from 'commander';

// Example
export default program
  .version('0.0.1')
  .option('-o, --option', 'option description')
  .option('-m, --more', 'we can have as many options as we want')
  .option('-i, --input [optional]', 'optional user input')
  .option('-I, --another-input <required>', 'required user input')
  .parse(process.argv);
