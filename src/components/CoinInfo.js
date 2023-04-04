import React from 'react'
import axios from "axios";
import { CryptoState } from '../CryptoContext';
import { useEffect, useState } from "react";
import { HistoricalChart } from "../config/api";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Line } from 'react-chartjs-2';
import { chartDays } from "../config/data"
import SelectButton from "./SelectButton"
import { CircularProgress } from '@mui/material';

Chart.register(CategoryScale);

const CoinInfo = ({ coin }) => {
  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);
  const { currency } = CryptoState();
  const [flag, setflag] = useState(false);

  const fetchHistoricData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    setflag(true);
    setHistoricData(data.prices);
  };

  console.log(coin);

  useEffect(() => {
    fetchHistoricData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days]);

  return (
    <div className='container shadow p-3 mb-3 bg-white rounded'>
      {!historicData | flag === false ? (
        <CircularProgress
          style={{ color: "blue",}}
          size={250}
          thickness={1}
        />
      ) : (
        <>
          <div className="my-2">
            <Line data={{
              labels: historicData.map((coin) => {
                let date = new Date(coin[0]);
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`;
                return days === 1 ? time : date.toLocaleDateString();
              }),

              datasets: [
                {
                  data: historicData.map((coin) => coin[1]),
                  label: `Price ( Past ${days} Days ) in ${currency}`,
                  borderColor: "#EEBC1D",
                },
              ],
            }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }} />
            <div className="mt-3">
              {chartDays.map((day) => (
                <SelectButton
                  key={day.value}
                  onClick={() => {
                    setDays(day.value);
                    setflag(false);
                  }}
                  selected={day.value === days}
                >
                  {day.label}
                </SelectButton>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default CoinInfo