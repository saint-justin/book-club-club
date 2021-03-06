// Handles a request by passing in the parsedUrl and params to needed functions
const handlePutRequest = (req, res, parsedUrl, callback) => {
  const body = [];

  // If we error out, throw it to the user
  req.on('error', () => {
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
    const bodyParams = JSON.parse(bodyString);
    callback(req, res, bodyParams);
  });
};

module.exports = {
  handlePutRequest,
};
