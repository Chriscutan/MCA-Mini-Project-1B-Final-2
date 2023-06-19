import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import NewsCard from "../components/NewsCard";

function News() {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    const fetchNews = async () => {
      const response = await axios
        .get(
          "https://newsapi.org/v2/everything?q=agriculture&apiKey=84d289fbe0c346ae870080e0fc59a675"
        )
        .catch((err) => alert(err.message));

      setArticles(response?.data?.articles);
    };

    return fetchNews;
  }, []);

  console.log(articles);
  return (
    <div className="bg-gray-100">
      <Header />

      <div>
        {articles?.map((article) => (
          <NewsCard
            key={article?.url}
            image={article?.urlToImage}
            author={article?.author}
            desc={article?.description}
            date={article?.publishedAt}
            visitUrl={article?.url}
          />
        ))}
      </div>
    </div>
  );
}

export default News;
