import React, { useEffect, useState } from 'react'
import { getNews } from './api/news';
import { Link } from 'react-router-dom';
import { LinearProgress } from '@mui/material';

const News = () => {
  const [page, setPage] = useState(1);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);


  const fetchNews = async () => {
    try {
      setLoading(true);
      const news = await getNews()
      setResponse(news);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [])

  return (
    <div className='container text-center'>
      <h1>Crypto News - from CrypSEA</h1>
      <h4>With our new web-app service, you can read all the most recent cryptocurrency-related news from all across the world...</h4>

      <div className="container">
        <div className="row">
          {loading ? (<LinearProgress />)
            : (
              <>
                {response &&
                  response.map(news => {
                    return (
                      <div className="col-md-4 my-3">
                        <div className="card p-2 border border-dark" style={{ height: "66vh" }}>
                          <img
                            src={news.related_image_big}
                            className="rounded border border-dark" alt='img' />
                          <Link
                            className="text-center" style={{ textDecoration: "none" }}
                            key={news.news_ID}
                            to={
                              news.news_link
                                ? news.news_link
                                : news.third_party_url
                            }
                          >
                            <h4 className="mt-3">
                              {news.HEADLINE}
                            </h4>
                            <p className="mt-4 text-center">
                              {news.news_provider_name}
                            </p>
                          </Link>
                        </div>
                      </div>
                    );
                  })}
              </>
            )
          }

        </div>
      </div>
      {response && (
        <div className="flex flex-col mt-4 justify-center">
          <button
            className="btn btn-success btn-lg"
            onClick={() => {
              setPage(page + 1);
              getNews();
            }}
          >
            Load next page &rarr;
          </button>
        </div>
      )}
    </div>
  )
}

export default News
