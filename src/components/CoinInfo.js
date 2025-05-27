import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { CryptoState } from '../CryptoContext'
import { HistoricalChart } from '../config/api'
import { Line, Chart } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, TimeScale, PointElement, LineElement, Tooltip, Legend }
  from 'chart.js'
import { CandlestickController, CandlestickElement, OhlcController, OhlcElement }
  from 'chartjs-chart-financial'
import 'chartjs-adapter-date-fns'
import { chartDays } from '../config/data'
import SelectButton from './SelectButton'
import { CircularProgress, Box, IconButton } from '@mui/material'
import ShowChartIcon from '@mui/icons-material/ShowChart'
import CandlestickChartIcon from '@mui/icons-material/CandlestickChart'

ChartJS.register(
  CategoryScale, LinearScale, TimeScale,
  PointElement, LineElement, Tooltip, Legend,
  CandlestickController, CandlestickElement,
  OhlcController, OhlcElement
)

export default function CoinInfo({ coin }) {
  const [prices, setPrices] = useState()
  const [ohlc, setOhlc] = useState()
  const [days, setDays] = useState(1)
  const [loading, setLoading] = useState(false)
  const [chartType, setChartType] = useState('line')
  const { currency } = CryptoState()

  useEffect(() => {
    const fetch = async () => {
      setLoading(true)
      try {
        const [pRes, oRes] = await Promise.all([
          axios.get(HistoricalChart(coin.id, days, currency)),
          axios.get(`https://api.coingecko.com/api/v3/coins/${coin.id}/ohlc?vs_currency=${currency.toLowerCase()}&days=${days}`)
        ])
        setPrices(pRes.data.prices)
        setOhlc(oRes.data.map(([t, o, h, l, c]) => ({ x: t, o, h, l, c })))
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [coin.id, days, currency])

  if (loading || !prices) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress size={80} />
      </Box>
    )
  }

  const lineData = {
    labels: prices.map(p => new Date(p[0])),
    datasets: [{
      data: prices.map(p => p[1]),
      borderColor: '#EEBC1D',
      label: `Price (Past ${days} Days) in ${currency}`,
      pointRadius: 1
    }]
  }

  const candleData = {
    datasets: [{
      label: `OHLC (Past ${days} Days) in ${currency}`,
      data: ohlc
    }]
  }

  const options = {
    scales: {
      x: { type: 'time', time: { unit: days === 1 ? 'hour' : 'day' } }
    },
    plugins: { legend: { display: false } }
  }

  // If candlestick, only allow 1-day
  const daysOptions = chartType === 'candlestick'
    ? chartDays.filter(d => d.value === 1)
    : chartDays

  return (
    <div className="container shadow p-3 mb-3 bg-white rounded">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box>
          {daysOptions.map(d => (
            <SelectButton
              key={d.value}
              selected={d.value === days}
              onClick={() => {
                setDays(d.value)
              }}
            >
              {d.label}
            </SelectButton>
          ))}
        </Box>
        <Box>
          <IconButton
            color={chartType === 'line' ? 'primary' : 'default'}
            onClick={() => {
              setChartType('line')
            }}
          >
            <ShowChartIcon />
          </IconButton>
          <IconButton
            color={chartType === 'candlestick' ? 'primary' : 'default'}
            onClick={() => {
              setChartType('candlestick')
              setDays(1)
            }}
          >
            <CandlestickChartIcon />
          </IconButton>
        </Box>
      </Box>

      {chartType === 'line'
        ? <Line data={lineData} options={options} />
        : <Chart type="candlestick" data={candleData} options={options} />
      }
      <span>*⚠️ API is free—please wait 5 to 10 seconds between chart requests to avoid rate limits!</span>
    </div>
  )
}
