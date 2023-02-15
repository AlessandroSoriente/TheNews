import _ from 'lodash';
import axios from 'axios';
import '../css/style.css';

import favicon from "../img/favicon.png";
import background from "../img/wallpeaper.jpg";
document.body.style.backgroundImage = `url(${background})`;

const link = document.createElement("link");
link.rel = "shortcut icon";
link.href = favicon;
document.head.appendChild(link);

const apiKey= process.env.API_URL;
const newsContainer = document.getElementById('news-container');
let news = [];

async function fetchNews() {
  const response = await axios.get(`${apiKey}newstories.json`);
  news = response.data;
  displayNews();
}

async function fetchNewsDetails(id) {
  const response = await axios.get(`${apiKey}item/${id}.json`);
  return response.data;
}

export async function displayNews() {
  let html = '';
  const newsDetails = await Promise.all(news.slice(_currentPage * 10, _currentPage * 10 + 10).map(fetchNewsDetails));
  _.forEach(newsDetails, (newsItem) => {
    if (!newsItem) return;
    html += `
      <div class="news-item">
        <h2>${newsItem.title}</h2>
        <a href="${newsItem.url}" target="_blank">${newsItem.url}</a>
        <p>${new Date(newsItem.time * 1000).toLocaleString()}</p>
      </div>`;
  });
  newsContainer.innerHTML = html;
}

let _currentPage = 0;

export function currentPage() {
  return _currentPage;
}

export function setCurrentPage(value) {
  _currentPage = value;
}

const loadMoreButton = document.getElementById('loadMoreButton');
loadMoreButton.addEventListener('click', () => {
  setCurrentPage(_currentPage + 1);
  displayNews();
});

fetchNews();