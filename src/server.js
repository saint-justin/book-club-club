const http = require('http');
const url = require('url');

// Main event handlers
const requestHandler = require('./requestHandler.js');
const putHandler = require('./putHandler.js');

// Get a port to run on
const port = process.env.PORT || process.env.NODE_PORT || 3000;

// Handles incoming requests to the server
const onRequest = (req, res) => {
  const parsedUrl = url.parse(req.url);
  console.log(`PATH: ${parsedUrl.pathname}    METHOD: ${req.method}`);
  // console.log(params);

  switch (req.method) {
    case 'GET':
      if (parsedUrl.pathname === '/') requestHandler.getClient(req, res);
      else if (parsedUrl.pathname === '/style.css') requestHandler.getStyle(req, res);
      else if (parsedUrl.pathname === '/getMeetings') requestHandler.getMeetings(req, res);
      else if (parsedUrl.pathname === '/main.js') requestHandler.getScriptMain(req, res);
      else if (parsedUrl.pathname === '/timezones.js') requestHandler.getScriptTimezones(req, res);
      break;
    case 'PUT':
      if (parsedUrl.pathname === '/addMeeting') putHandler.handlePutRequest(req, res, parsedUrl, requestHandler.addMeeting);
      break;
    default:
      console.log(`ERR: Method type ${req.method} not acceptable`);
      break;
  }
};

// Spin up the actual server
http.createServer(onRequest).listen(port);
console.log(`Listening on 127.0.0.1:${port}`);
