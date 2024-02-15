import swaggerAutogen from 'swagger-autogen';

const swagger = await swaggerAutogen();

const outputFile = './swagger_output.json';
const endpointsFiles = ['./server.js']; // Your Express application entry file

swagger(outputFile, endpointsFiles);
