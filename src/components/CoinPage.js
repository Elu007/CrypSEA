import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import ReactHtmlParser from "html-react-parser";
import { LinearProgress } from '@mui/material';
import { SingleCoin } from "../config/api"
import { CryptoState } from '../CryptoContext'
import CoinInfo from "./CoinInfo"
import { numberWithCommas } from './CoinsTable';

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  }
  // console.log(coin);
  useEffect(() => {
    fetchCoin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;
  return (
    <div className='container'>
      <div className="row">
        <div className="col-md-3">
          <img
            src={coin?.image.large}
            alt={coin?.name}
            height="200"
            style={{ marginBottom: 20 }}
          />
          <h3 className='mx-5 mb-3'>{coin?.name}</h3>
          <p className='p-2 text-start'>
            {ReactHtmlParser(coin?.description.en.split(". ")[0])}.
          </p>
          <div className='mx-2'>
            <span>
              <h5>Rank: {coin?.market_cap_rank}</h5>
            </span>
            <span>
              <h5>Market Cap:  {symbol}{" "}
                {numberWithCommas(
                  coin?.market_data.market_cap[currency.toLowerCase()]
                    .toString()
                    .slice(0, -6)
                )}
                M</h5>
            </span>
            <span className='d-flex'><h5>Current Price: {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}</h5></span>
          </div>
        </div>
        <div className="col-md">
          <CoinInfo coin={coin} />
        </div>
      </div>
    </div>
  )
}

export default CoinPage
