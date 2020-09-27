const fetch = require('node-fetch');
const x2j = require('xml2js');

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

module.exports = {
  getBrandon,
};
