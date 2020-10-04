const fs = require('fs');
const short = require('short-uuid');

const client = fs.readFileSync(`${__dirname}/../client/client.html`);
const style = fs.readFileSync(`${__dirname}/../client/style.css`);
const scriptMain = fs.readFileSync(`${__dirname}/../client/main.js`);
const scriptTimezones = fs.readFileSync(`${__dirname}/../client/timezones.js`);

const meetingData = { };

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

// Returns the client stylings
const getStyle = (req, res) => {
  const head = generateHeader('text/css');
  respondJSON(req, res, 200, head, style);
};

// Returns the main.js client script
const getScriptMain = (req, res) => {
  const head = generateHeader('application/javascript');
  respondJSON(req, res, 200, head, scriptMain);
};

// Returns the timezones.js client script
const getScriptTimezones = (req, res) => {
  const head = generateHeader('application/javascript');
  respondJSON(req, res, 200, head, scriptTimezones);
};

// Gets the stored meetings and give 'em to the client
const getMeetings = (req, res) => {
  const head = generateHeader('application/json');
  const body = Object.keys(meetingData).length !== 0 ? meetingData : { message: 'No meetings planned' };
  respondJSON(req, res, 200, head, body);
};

// Tries to add a given meeting to the meetings object
const addMeeting = (req, res, params) => {
  const head = generateHeader('application/json');
  const body = {
    id: 'badRequest',
  };

  // Throw a 400/BadRequest if the included params are bad
  if (!params.title || !params.date || !params.time || !params.timezone || !params.zoom) {
    body.message = 'Missing required parameters';
    respondJSON(req, res, 400, head, body);
    return;
  }

  // If the params are fine, make a new entry and add it to meetingData
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

  console.log(meetingData);

  respondJSON(req, res, 200, head, body);
};

// Export all the user-accessible items
module.exports = {
  getClient,
  getStyle,
  getMeetings,
  getScriptMain,
  getScriptTimezones,
  addMeeting,
};
