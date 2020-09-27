const fetch = require('node-fetch');
const x2j = require('xml2js');
const secret = require('./secret.js');

// Get an author's information
const getBrandon = async () => {
  const response = await fetch('https://www.goodreads.com/api/author_url/Brandon%20Sanderson?key=');
  const xmlText = await response.text();
  const json = await x2j.parseStringPromise(xmlText);

  console.log(json.GoodreadsResponse);
  console.log(json.GoodreadsResponse.author);

  const [request, author] = json.GoodreadsResponse;

  console.log(request);
  console.log(author);
};

// Get an author code by a given author
const getAuthorCode = async (authorName) => {
  const encodedName = encodeURIComponent(authorName);
  const response = await fetch(`https://www.goodreads.com/api/author_url/${encodedName}?key=${secret.key}`);
  const xmlText = await response.text();
  const json = await x2j.parseStringPromise(xmlText);

  console.log(json.GoodreadsResponse);
};

module.exports = {
  getBrandon,
  getAuthorCode,
};
