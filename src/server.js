const http = requires('http');
const url = require('url');
const query = require('query');

const port = process.env.PORT || process.env.NODE_PORT || 3000;
const urlStruct = {
  '/': htmlHandler.getClient,
  '/style.css': htmlHandler.getStyle,
  '/getUsers': jsonHandler.getUsers,
};

const onRequest = (req, res) => {
  const parsedUrl = url.parse(req.url);

  // Prints info about the request
  console.log(`PATH: '${parsedUrl.pathname}'    METHOD: ${req.method}`);

  // Handle cases for get, post, and head requests
  // if ((req.method === 'GET' || req.method === 'HEAD') && urlStruct[parsedUrl.pathname]) {
  //   urlStruct[parsedUrl.pathname](req, res);
  // } else if (req.method === 'POST') {
  //   handlePost(req, res, parsedUrl);
  // } else {
  //   jsonHandler.missing(req, res);
  // }
};

http.createServer(onRequest).listen(port);
// console.log(`Listening on 127.0.0.1:${port}`);
