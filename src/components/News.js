import React, { useEffect, useState } from 'react'
import { getNews } from './api/news'
import { Link } from 'react-router-dom'
import { LinearProgress } from '@mui/material'

const News = () => {
  const [page, setPage] = useState(1)
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchNews = async () => {
    try {
      setLoading(true)
      const news = await getNews(page)
      setResponse(news)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNews()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  return (
    <div className="container text-center">
      <h1>Crypto News - from CrypSEA</h1>
      <h4 className="mb-4">
        With our new web-app service, you can read all the most recent cryptocurrency-related news from all across the world...
      </h4>

      <div className="container shadow-lg p-3 mb-5 bg-body rounded">
        {loading ? (
          <LinearProgress />
        ) : (
          <div className="row">
            {response && response.map((newsItem) => (
              <div className="col-md-4 my-3" key={newsItem.news_ID}>
                <div className="card p-2 border border-dark" style={{ height: '66vh' }}>
                  <img
                    src={newsItem.related_image_big}
                    alt="news"
                    className="rounded border border-dark mb-2"
                    style={{
                      width: '100%',
                      height: '200px',
                      objectFit: 'cover'
                    }}
                  />
                  <Link
                    to={newsItem.news_link || newsItem.third_party_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <h4
                      className="mt-2"
                      style={{
                        fontSize: '1.1rem',
                        lineHeight: '1.3',
                        height: '2.6rem',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical'
                      }}
                    >
                      {newsItem.HEADLINE}
                    </h4>
                    <p
                      className="mt-3 mb-0 text-secondary"
                      style={{
                        fontSize: '0.9rem',
                        height: '1.2rem',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {newsItem.news_provider_name}
                    </p>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {response && (
        <div className="d-flex justify-content-center mb-5">
          <button
            className="btn btn-success btn-lg"
            onClick={() => setPage(prev => prev + 1)}
          >
            Load next page &rarr;
          </button>
        </div>
      )}
    </div>
  )
}

export default News
