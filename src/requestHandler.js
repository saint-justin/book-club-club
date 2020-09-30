const fs = require('fs');
const short = require('short-uuid');

const client = fs.readFileSync(`${__dirname}/../client/client.html`);
const meetingData = {};

// Helper fxn to easily generate a header type
const generateHeader = (type) => ({ 'Content-Type': type });

// Parent function actually writes the response information
const respondJSON = (req, res, status, header, body) => {
  res.writeHead(status, header);
  if (req.method !== 'HEAD') {
    if (header['Content-Type'] === 'application/json') res.write(JSON.stringify(body));
    else res.write(body);
  }
  res.end();
};

// Returns the client html page to the user
const getClient = (req, res) => {
  const head = generateHeader('text/html');

  respondJSON(req, res, 200, head, client);
};

// Gets the stored meetings and give 'em to the client
const getMeetings = (req, res) => {
  const head = generateHeader('application/json');
  const body = Object.keys(meetingData).length !== 0 ? meetingData : { message: 'No meetings planned' };
  respondJSON(req, res, 200, head, body);
};

const addMeeting = (req, res, parsedUrl, params) => {
  const head = generateHeader('application/json');
  const body = {
    id: 'badRequest',
  };

  if (!params.title || !params.date || !params.time || !params.timezone || !params.zoom) {
    body.message = 'Missing required parameters';
    respondJSON(req, res, 400, head, body);
  }

  const entryId = short.generate();
  const newEntry = {
    title: params.title,
    data: params.date,
    time: params.time,
    am: params.am,
    timezone: params.timezone,
    zoomlink: params.zoom,
  };

  meetingData[entryId] = newEntry;
  body.id = 'Success';
  body.unique = entryId;
  respondJSON(req, res, 200, head, body);
};

// Export all the user-accessible items
module.exports = {
  getClient,
  getMeetings,
  addMeeting,
};
