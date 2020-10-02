/* eslint-env browser */
import timezones from '/timezones.js';

const button = document.querySelector('#btn');
const meetingTitle = document.querySelector('#meeting-title');

// Initializes the scripts on the page
const init = (e) => {
  e.preventDefault();

  document.querySelector('#meeting-timezones').innerHTML = timezones;
  console.log('initializing');
};

// Sends a request to our server to post information
const sendRequest = async (e) => {
  e.preventDefault();

  const data = {
    title: ,
    club: inputs[1].value,
    date: inputs[2].value,
    time: inputs[3].value,
    am: false,
    timezone: inputs[4].value,
    zoom: inputs[5].value,
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

button.onclick = sendRequest;
window.onload = init;
