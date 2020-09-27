const http = require('http');
const url = require('url');
const query = require('querystring');

// Main event handlers
const externalApiHandler = require('./externalApiHandler.js');
const putHandler = require('./putHandler.js');
const requestHandler = require('./requestHandler.js');

// Get a port to run on
const port = process.env.PORT || process.env.NODE_PORT || 3000;

// Handles incoming requests to the server
const onRequest = (req, res) => {
  const parsedUrl = url.parse(req.url);
  let params = '';
  if (req.method !== 'PUT') params = query.parse(parsedUrl.query);
  console.log(`PATH: ${parsedUrl.pathname}    METHOD: ${req.method}`);
  // externalApiHandler.getBrandon();

  // externalApiHandler.

  switch (req.method) {
    case 'GET':
      if (parsedUrl.pathname === '/') requestHandler.getClient(req, res);
      if (params.author) externalApiHandler.getAuthorCode(params.author);
      break;
    case 'PUT':
      putHandler.handlePutRequest(req, res, parsedUrl, () => { });
      break;
    default:
      console.log(`ERR: Method type ${req.method} not acceptable`);
      break;
  }
};

// Spin up the actual server
http.createServer(onRequest).listen(port);
console.log(`Listening on 127.0.0.1:${port}`);
