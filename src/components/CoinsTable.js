import { Table, TableContainer, TableHead, TableRow, TextField, TableCell, TableBody, Pagination, LinearProgress } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { CoinList } from '../config/api';
import { CryptoState } from '../CryptoContext';

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{5})+(?!\d))/g, ",");
}
const CoinsTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const { currency, symbol } = CryptoState();
  const [page, setPage] = useState(1);


  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    setCoins(data);
    setLoading(false);
  }
  useEffect(() => {
    fetchCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency])

  const handleSearch = () => {
    return coins.filter((coin) => (
      coin.name.toLowerCase().includes(search) ||
      coin.symbol.toLowerCase().includes(search)
    ))
  }

  return (
    <div className='container text-center'>
      <h1 className='my-3'>Live Prices of Crypto Currencies</h1>
      <TextField label="Search For a Crypto Currency..." variant='outlined' style={{ marginBottom: 20, width: "100%" }} onChange={(e) => setSearch(e.target.value)} />
      <TableContainer style={{ borderRadius: '16px' }}>
        {loading ? (
          <LinearProgress color='primary' />
        ) : (<>
          <Table>
            <TableHead>
              <TableRow>
                {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                  <TableCell
                    style={{
                      backgroundColor: "#f5f500",
                      fontWeight: "800",
                    }}
                    key={head}
                    align={head === "Coin" ? "" : "right"}
                  >
                    {head}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {handleSearch()
                .slice((page - 1) * 10, (page - 1) * 10 + 10)
                .map((row) => {
                  const profit = row.price_change_percentage_24h > 0;
                  return (
                    <TableRow key={row.name}>
                      <TableCell component='th' scope='row' style={{ display: "flex", gap: 15 }}>
                        <img
                          src={row?.image}
                          alt={row.name}
                          height="50"
                          style={{ marginBottom: 10 }}
                        />
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <span
                            style={{
                              textTransform: "uppercase",
                              fontSize: 22,
                            }}
                          >
                            {row.symbol}
                          </span>
                          <span style={{ color: "black" }}>
                            {row.name}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell align="right">
                        {symbol}{" "}
                        {numberWithCommas(row.current_price.toFixed(2))}
                      </TableCell>
                      <TableCell
                        align="right"
                        style={{
                          color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                          fontWeight: 500,
                        }}
                      >
                        {profit && "+"}
                        {row.price_change_percentage_24h.toFixed(2)}%
                      </TableCell>
                      <TableCell align="right">
                        {symbol}{" "}
                        {numberWithCommas(
                          row.market_cap.toString().slice(0, -6)
                        )}
                        M
                      </TableCell>
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table></>)
        }</TableContainer>

      <Pagination
        style={{
          color: "gold",
          padding: 20,
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
        count={(handleSearch()?.length / 10).toFixed(0)}
        onChange={(_, value) => {
          setPage(value);
          window.scroll(0, 50);
        }}
      />
    </div>
  )
}

export default CoinsTable
