import generateSchema from 'json-schema-generator';

const createJsonSchema = obj => generateSchema(obj);

export default createJsonSchema;
