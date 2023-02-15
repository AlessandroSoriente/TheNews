const apiKey= process.env.API_URL;
let news = [];

import { displayNews } from "./main";
import { loadMore } from "./event";

export const fetchNews = async () => {
  try {
    const { data } = await axios.get(`${apiKey}newstories.json`);
    news = data;
    displayNews();
  } catch (error) {
    console.error(error);
  }
};

export const fetchNewsDetails = async (id) => {
  try {
    const { data } = await axios.get(`${apiKey}item/${id}.json`);
    return data;
  } catch (error) {
    console.error(error);
  }
};