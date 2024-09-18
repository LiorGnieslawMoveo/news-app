import NewsList from "@/components/news-list";
import ReturnButton from "@/components/return-button";
import { getAllNews } from "@/lib/news";

export default async function NewsPage() {
  const news = await getAllNews();

  return (
    <>
      <span className="filter-nav">
        <h1>News Page</h1>
        <ReturnButton />
      </span>
      <NewsList news={news} />
    </>
  );
}
