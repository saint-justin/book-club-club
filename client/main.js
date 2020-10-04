/* eslint-env browser */
import timezones from '/timezones.js';

// Getting refs to all the inputs on the page
const button = document.querySelector('#btn');
const meetingTitle = document.querySelector('#meeting-title');
const meetingClub = document.querySelector('#meeting-club');
const meetingDate = document.querySelector('#meeting-date');
const meetingTime = document.querySelector('#meeting-time');
const meetingTimezone = document.querySelector('#meeting-timezones');
const meetingLink = document.querySelector('#meeting-link');

const upcomingMeetings = document.querySelector('#upcoming-meetings');
const upcomingIndividuals = document.querySelector('#upcoming-individuals');

let clientInfo = {};

// Generates an upcoming meeting component based on info supplied based on format below
/*
  <div class='upcoming-container'>
    <h3 class='upcoming-book'>The Way of Kings (The Stormlight Archives, Book 1)</h3>
    <h4 class='upcoming-group'>Fantasy Readers Club</h4>
    <br>
    <p class='upcoming-time'>10/15/2020, 4:45 PM (GMT -08:00) Pacific Time (US & Canada)</p>
    <a class='upcoming-link' href='https://zoom.com/zoomlink'>Meeting Link: https://zoom.com/zoomlink</a>
  </div>
*/
const generateAndAppendMeeting = (title, club, date, time, timezone, link) => {
  const div = document.createElement('div');
  div.className = 'upcoming-container';

  const h3 = document.createElement('h3');
  h3.className = 'upcoming-book';
  h3.textContent = title;

  const h4 = document.createElement('h4');
  h4.className = 'upcoming-group';
  h4.textContent = club;

  const br = document.createElement('br');

  const p = document.createElement('p');
  p.className = 'upcoming-time';
  p.textContent = `${date}, ${time} ${timezone}`;

  const a = document.createElement('a');
  a.className = 'upcoming-time';
  a.href = link;
  a.textContent = `Meeting Link: ${link}`;

  div.appendChild(h3);
  div.appendChild(h4);
  div.appendChild(br);
  div.appendChild(p);
  div.appendChild(a);

  upcomingMeetings.appendChild(div);
};

// Clears all child nodes on a given node
const clearChildren = (node) => {
  while (node.children.length > 0) node.removeChild(node.children[0]);
};

// Sends a request to our server to post information
const sendPut = async (e) => {
  e.preventDefault();

  console.log('Creating Data Object for PUT');

  const data = {
    title: meetingTitle.value,
    club: meetingClub.value,
    date: meetingDate.value,
    time: meetingTime.value,
    timezone: meetingTimezone.value,
    zoom: meetingLink.value,
  };

  console.log(data);
  console.log('Creating send object');

  const sendObj = {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data),
  };

  console.log('Pushing data...');
  const response = await fetch('/addMeeting', sendObj);
  console.log(await response.json());
};

// Gets a new set of meetings and plops 'em into the dom
const getMeetings = async () => {
  const response = await fetch('/getMeetings');
  clientInfo = await response.json();

  clearChildren(upcomingIndividuals);
  for (let i = 0; i < clientInfo.content.length; i++) {
    generateAndAppendMeeting(clientInfo[i].title, clientInfo[i].date, clientInfo[i].time, 'AM', clientInfo[i].timezone, clientInfo[i].link);
  }
};

// Checks if local meetingData matches version of server meetingData
const checkMeetingVersion = async () => {
  const response = await fetch('./getVersion');
  const json = await response.json();

  if (json.version !== clientInfo.version) getMeetings();
};

// Initializes the scripts on the page
const init = (e) => {
  e.preventDefault();

  document.querySelector('#meeting-timezones').innerHTML = timezones;

  getMeetings();
  setInterval(checkMeetingVersion, 1000);
};

button.onclick = sendPut;
window.onload = init;
