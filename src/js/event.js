import { currentPage, setCurrentPage } from "./main";
import { news, fetchNews } from "./request";

export const loadMore = () => {
  setCurrentPage(currentPage() + 1);
  displayNews();
};