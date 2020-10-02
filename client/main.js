/* eslint-env browser */
const button = document.querySelector('#btn');
const inputs = document.querySelectorAll('input');

// Generates 
const generateTimezones = (e) => {
  e.preventDefault();

  const zones = ct.getAllTimezones();
  console.log(zones);
};

const sendRequest = async (e) => {
  e.preventDefault();

  const data = {
    title: inputs[0].value,
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

const loadScript = (url, callback) => {
  const head = document.head;

  console.log(head);
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url;

  script.onload = callback;

  head.appendChild(script);
};

const init = (e) => {
  e.preventDefault();
  console.log('initializing');

  const ctUrl = 'https://cdn.jsdelivr.net/gh/manuelmhtr/countries-and-timezones@latest/dist/index.js';
  loadScript(ctUrl, generateTimezones);
  console.log('script loaded!');
};

button.onclick = sendRequest;
window.onload = init;
