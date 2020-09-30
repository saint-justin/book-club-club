const http = require('http');
const url = require('url');
const query = require('querystring');

// Main event handlers
const requestHandler = require('./requestHandler.js');
const putHandler = require('./putHandler.js');

// Get a port to run on
const port = process.env.PORT || process.env.NODE_PORT || 3000;

// Handles incoming requests to the server
const onRequest = (req, res) => {
  const parsedUrl = url.parse(req.url);
  const params = parsedUrl.pathname !== 'PUT' ? query.parse(parsedUrl.query) : '';
  console.log(`PATH: ${parsedUrl.pathname}    METHOD: ${req.method}    PARAMS: []`);

  switch (req.method) {
    case 'GET':
      if (parsedUrl.pathname === '/') requestHandler.getClient(req, res);
      if (parsedUrl.pathname === '/getMeetings') requestHandler.getMeetings(req, res);
      // if (params.author) externalApiHandler.getAuthorCode(params.author);
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
