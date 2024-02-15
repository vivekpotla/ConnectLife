import swaggerAutogen from 'swagger-autogen';

const swagger = await swaggerAutogen();

const outputFile = './swagger_output.json';
const endpointsFiles = ['./server.js']; // Your Express application entry file

const options = {
    host: 'localhost:5000', // Specify the hostname and port
  };
swagger(outputFile, endpointsFiles,options);
