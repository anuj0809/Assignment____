import React, { useEffect, useState } from "react";
import TradeCard from "../../components/TradeCard/TradeCard";
import "./TradeScreen.css";
import axios from "axios";
import { w3cwebsocket } from "websocket";

const TradeScreen = () => {
  const [selectedToken, setSelectedToken] = useState<any>();
  const [currentPriceSelectedToken, setCurrentPriceSelectedToken] =
    useState(0);
  const [tokens, setTokens] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAllTokenSymbols = async () => {
    const { data } = await axios.get(
      "https://api.binance.com/api/v3/exchangeInfo"
    );
    const newTokens = new Set();
    data.symbols.forEach((symbol: any) => {
      newTokens.add(symbol.symbol);
    });
    setTokens(Array.from(newTokens).slice(0, 20));
    setSelectedToken(Array.from(newTokens)[0]);
    setLoading(false);
  };

  useEffect(() => {
    fetchAllTokenSymbols();
  }, []);

  const subscribeToUpdates = async (symbol: any) => {
    const socket = new w3cwebsocket("wss://stream.binance.com:443/ws");
    socket.onopen = () => {
      console.log("WebSocket Client Connected");
      const payload = {
        method: "SUBSCRIBE",
        params: [`${symbol.toLowerCase()}@aggTrade`],
        id: 1,
      };
      socket.send(JSON.stringify(payload));
    };

    socket.onmessage = async (message) => {
      const data = JSON.parse(message.data.toString());
      setCurrentPriceSelectedToken(data.p);
      console.log("Received message:", data);
    };

    socket.onclose = () => {
      console.log("WebSocket Client Disconnected");
      socket.close();
    };
  };

  useEffect(() => {
    if (!loading) {
      subscribeToUpdates(selectedToken);
    }
  }, [selectedToken, loading]);

  return (
    <>
      {loading ? (
        <div className="loading">loading...</div>
      ) : (
        <div className="container">
          <div className="trade_screen_wrapper">
            <TradeCard
              tokens={tokens}
              selectedToken={selectedToken}
              setSelectedToken={setSelectedToken}
              currentPriceSelectedToken={currentPriceSelectedToken}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default TradeScreen;
