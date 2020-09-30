const fs = require('fs');
// const short = require('short-uuid');

const client = fs.readFileSync(`${__dirname}/../client/client.html`);
const meetingData = {};

// Helper fxn to easily generate a header type
const generateHeader = (type) => ({ 'Content-Type': type });

// Parent function actually writes the response information
const respondJSON = (req, res, status, header, body) => {
  res.writeHead(status, header);
  if (req.method !== 'HEAD') res.write(JSON.stringify(body));
  res.end();
};

// Returns the client html page to the user
const getClient = (req, res) => {
  const head = generateHeader('text/html');

  respondJSON(req, res, 200, head, client);
};

const getMeetings = (req, res) => {
  const head = generateHeader('application.json');
  const body = Object.keys(meetingData).length !== 0 ? meetingData : { message: 'No meetings planned' };
  respondJSON(req, res, 200, head, body);
};

// Export all the user-accessible items
module.exports = {
  getClient,
  getMeetings,
};
