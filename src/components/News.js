import React, { useEffect, useState } from 'react'
import { getNews } from './api/news';

const News = () => {
  const [page, setPage] = useState(1);
  const [response, setResponse] = useState(null);

  const fetchNews = async () => {
    try {
      const news = await getNews()
      setResponse(news);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(()=>{
    fetchNews();
  }, [])

  return (
    <div className='container text-center'>
      <h1>Crypto News - from CrypSEA</h1>
      <h4>Read all the cryptocurrency related latest news around the world with our new app service</h4>

      <div className="container">
        {response &&
          response.map(news => {
            return (
              <div className="card">
                <img
                  src={news.related_image_big}
                  width="300"
                  length="300"
                  className="card-img-top" alt='img'
                ></img>
                <a
                  className="text-center"
                  key={news.news_ID}
                  href={
                    news.news_link
                      ? news.news_link
                      : news.third_party_url
                  }
                >
                  <h3 className="mt-10">
                    {news.HEADLINE}
                  </h3>
                  <p className="mt-4 text-center">
                    {news.news_provider_name}
                  </p>
                </a>
              </div>
            );
          })}
      </div>
      {response && (
        <div className="flex flex-col mt-10 justify-center">
          <button
            className="block text-active text-base font-bold"
            onClick={() => {
              setPage(page + 1);
              getNews();
            }}
          >
            Load next page
          </button>
        </div>
      )}
    </div>
  )
}

export default News
