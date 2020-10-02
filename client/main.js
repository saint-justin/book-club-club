/* eslint-env browser */
import timezones from '/timezones.js';

// Getting refs to all the inputs on the page
const button = document.querySelector('#btn');
const meetingTitle = document.querySelector('#meeting-title');
const meetingClub = document.querySelector('#meeting-club');
const meetingDate = document.querySelector('#meeting-date');
const meetingTime = document.querySelector('#meeting-time');
const meetingTimezone = document.querySelector('#meeting-timezone');
const meetingLink = document.querySelector('#meeting-link');

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

button.onclick = sendRequest;
window.onload = init;
