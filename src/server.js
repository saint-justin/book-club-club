const http = require('http');
const url = require('url');

// Main event handlers
const requestHandler = require('./requestHandler.js');
const putHandler = require('./putHandler.js');

// Get a port to run on
const port = process.env.PORT || process.env.NODE_PORT || 3000;

// Directory object
const directory = {
  GET: {
    '/': requestHandler.getClient,
    '/style.css': requestHandler.getStyle,
    '/getMeetings': requestHandler.getMeetings,
    '/getVersion': requestHandler.getVersion,
    '/main.js': requestHandler.getScriptMain,
    '/timezones.js': requestHandler.getScriptTimezones,
  },
  PUT: {
    '/addMeeting': putHandler.handlePutRequest,
  },
};

// Handles incoming requests to the server
const onRequest = (req, res) => {
  const parsedUrl = url.parse(req.url);
  console.log(`PATH: ${parsedUrl.pathname}    METHOD: ${req.method}`);
  // console.log(params);

  if (req.method === 'PUT' && directory[req.method][parsedUrl.pathname]) {
    directory[req.method][parsedUrl.pathname](req, res, parsedUrl, requestHandler.addMeeting);
  } else if (req.method === 'GET' && directory[req.method][parsedUrl.pathname]) {
    directory[req.method][parsedUrl.pathname](req, res);
  } else {
    requestHandler.notFound(req, res);
  }
};

// Spin up the actual server
http.createServer(onRequest).listen(port);
console.log(`Listening on 127.0.0.1:${port}`);
