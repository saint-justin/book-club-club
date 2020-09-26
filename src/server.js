const http = require('http');
const url = require('url');
const query = require('querystring');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

// Handles a request by passing in the parsedUrl and params to needed functions
const handlePutRequest = (req, res, parsedUrl, callback) => {
  const body = [];
  
  // If we error out, throw it to the user
  req.on('error', (err) => {
    console.dir(err);
    res.statusCode = 400;
    res.end();
  });

  // Build up the request query
  req.on('data', (chunk) => {
    body.push(chunk);
  });

  // Once we reach the end of the request, use the provided callback w/ parsed query params
  req.on('end', () => {
    const bodyString = Buffer.concat(body).toString();
    const bodyParams = query.parse(bodyString);
    callback(req, res, parsedUrl, bodyParams);

    // Debug output
    console.log(`PATH: ${parsedUrl.pathname}    METHOD: ${req.method}    PARAMS: []`);
  });
};

// Handles incoming requests to the server
const onRequest = (req, res) => {
  const parsedUrl = url.parse(req.url);
  switch (req.method) {
    case 'GET':
      console.log(`PATH: ${parsedUrl.pathname}    METHOD: ${req.method}    PARAMS: []`);
      break;
    case 'PUT':
      handlePutRequest(req, res, parsedUrl, () => { });
      break;
    default:
      console.log(`ERR: Method type ${req.method} not acceptable`);
      break;
  }
  handlePutRequest(req, res, parsedUrl, () => ({}));
};

http.createServer(onRequest).listen(port);
console.log(`Listening on 127.0.0.1:${port}`);
