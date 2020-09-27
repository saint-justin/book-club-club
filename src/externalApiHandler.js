const fetch = require('node-fetch');
const x2j = require('xml2js');
const secret = require('./secret.js');

// // Get an author's information
// const getBrandon = async () => {
//   const response = await fetch('https://www.goodreads.com/api/author_url/Brandon%20Sanderson?key=');
//   const xmlText = await response.text();
//   const json = await x2j.parseStringPromise(xmlText);

//   console.log(json.GoodreadsResponse);
//   console.log(json.GoodreadsResponse.author);

//   const [request, author] = json.GoodreadsResponse;

//   console.log(request);
//   console.log(author);
// };

const getBookReviews = async (bookId) => {
  console.log(`REQUEST: https://www.goodreads.com/book/show/${bookId}.xml?key=${secret.key}`);
  const response = await fetch(`https://www.goodreads.com/book/show/${bookId}.json?key=${secret.key}&format=json&text_only=true`);
  // const xmlText = await response.text();
  const json = await response.json();
  // return json.

  console.log(json.reviews_widget);
  return json.reviews_widget;
};

const getAuthorBooks = async (authorId) => {
  const response = await fetch(`https://www.goodreads.com/author/show.xml?key=${secret.key}&id=${authorId}&page=2`);
  const xmlText = await response.text();
  const json = await x2j.parseStringPromise(xmlText);

  const authorBooks = json.GoodreadsResponse.author[0].books[0].book;

  // console.log(authorBooks[0].id[0]._);
  // for (let i = 0; i < authorBooks.length; i++) {
  //   console.log(`ID: ${authorBooks[i].id[0]._}    TITLE: ${authorBooks[i].title}`);
  // }

  const bookNumber = Math.floor(Math.random() * authorBooks.length);
  console.log(`CHOSEN BOOK: ${authorBooks[bookNumber].title}    BOOK ID: ${authorBooks[bookNumber].id[0]._}`);

  return getBookReviews(authorBooks[bookNumber].id[0]._);
};

// Get an author code by a given author
const getAuthorCode = async (authorName) => {
  console.log(`Author requested: ${authorName}`)
  const encodedName = encodeURIComponent(authorName);
  const response = await fetch(`https://www.goodreads.com/api/author_url/${encodedName}?key=${secret.key}`);
  const xmlText = await response.text();
  const json = await x2j.parseStringPromise(xmlText);

  console.log('getting authors books...');

  // console.log(json.GoodreadsResponse.author);
  // console.log(json.GoodreadsResponse.author[0].$.id);
  // console.log(Object.keys(json.GoodreadsResponse.author[0]));

  return getAuthorBooks(json.GoodreadsResponse.author[0].$.id);
};

module.exports = {
  getAuthorCode,
  getAuthorBooks,
};
