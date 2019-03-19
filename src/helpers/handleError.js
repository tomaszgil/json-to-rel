const handleError = (error) => {
  console.error(error.message);
  process.exit(1);
};

export default handleError;
