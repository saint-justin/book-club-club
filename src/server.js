const http = require('http');
const url = require('url');

// Main event handlers
const externalApiHandler = require('./externalApiHandler.js');
const putHandler = require('./putHandler.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

// Handles incoming requests to the server
const onRequest = (req, res) => {
  const parsedUrl = url.parse(req.url);
  console.log(`PATH: ${parsedUrl.pathname}    METHOD: ${req.method}`);
  externalApiHandler.getBrandon();

  /*
  switch (req.method) {
    case 'GET':
          PARAMS: []`);
      break;
    case 'PUT':
      putHandler.handlePutRequest(req, res, parsedUrl, () => { });
      break;
    default:
      console.log(`ERR: Method type ${req.method} not acceptable`);
      break;
  }
  */
};

// Spin up the actual server
http.createServer(onRequest).listen(port);
console.log(`Listening on 127.0.0.1:${port}`);
