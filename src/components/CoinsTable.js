import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  TableCell,
  TableBody,
  Pagination,
} from "@mui/material";
import { red } from "@mui/material/colors";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { CoinList } from "../config/api";
import { CryptoState } from "../CryptoContext";

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
  };
  useEffect(() => {
    fetchCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  return (
    <div className="container">
      <h1 className="my-3 text-center" style={{ fontSize: 24 }}>
        Live Prices of Crypto Currencies
      </h1>
      <TextField
        label="Search For a Crypto Currency..."
        variant="outlined"
        style={{ marginBottom: 20, width: "100%" }}
        onChange={(e) => setSearch(e.target.value)}
      />
      <TableContainer style={{ borderRadius: "4px" }}>
        <Table style={{ width: "100%" }}>
          <TableHead>
            <TableRow>
              {["Coin", "Price", "Change", "Market Cap"].map((head) => (
                <TableCell
                  style={{
                    backgroundColor: "#f5f500",
                    fontWeight: "600",
                    fontFamily: "Montserrat",
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
                    <TableCell
                      component="th"
                      scope="row"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 15,
                      }}
                    >
                      <img src={row.image} alt={row.name} height="28px" />
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <span
                          style={{
                            textTransform: "uppercase",
                            fontSize: 16,
                          }}
                        >
                          {row.symbol}
                        </span>
                        <span style={{ color: "black" }}>{row.name}</span>
                      </div>
                    </TableCell>
                    <TableCell align="right">
                      <div style={{ fontSize: 16 }}>
                        <span style={{ paddingRight: 4 }}>{symbol}</span>
                        <span>
                          {numberWithCommas(row.current_price.toFixed(2))}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell
                      align="right"
                      style={{
                        color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                        fontWeight: 500,
                      }}
                    >
                      <div style={{ fontSize: 16 }}>
                        <span>{profit && "+"}</span>
                        <span>
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell align="right">
                      <div style={{ fontSize: 16 }}>
                        <span>{symbol}</span>
                        <span>
                          {numberWithCommas(
                            row.market_cap.toString().slice(0, -6)
                          )}
                        </span>
                        M
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination
        style={{
          color: "gold",
          padding: 20,
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
        count={(handleSearch().length / 10).toFixed(0)}
        onChange={(_, value) => {
          setPage(value);
          window.scroll(0, 50);
        }}
      />
    </div>
  );
};

export default CoinsTable;
