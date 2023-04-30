import React, { useState } from "react";
import "./TradeCard.css";
import Icon from "../../assets/images/eth.png";
import DropIcon from "../../assets/images/drop-arrow.png";
import CurrencyDialog from "../CurrencyDialog/CurrencyDialog";

interface TradeCardProps {
  tokens: string[];
  selectedToken: string;
  setSelectedToken: React.Dispatch<React.SetStateAction<string>>;
  currentPriceSelectedToken: number;
}

const TradeCard = (props: TradeCardProps) => {
  const { tokens, selectedToken, currentPriceSelectedToken, setSelectedToken } =
    props;
  const [isOpen, setIsOpen] = useState(false);
  const [inputPrice, setInputPrice] = useState<string>("");
  const [calculatedPrice, setCalculatedPrice] = useState<any>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputPrice(e.target.value);
    setCalculatedPrice((prev: any) =>
      (parseInt(e.target.value) / currentPriceSelectedToken).toFixed(5)
    );
  };

  return (
    <>
      <div className="card">
        <CurrencyDialog
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          selectedToken={selectedToken}
          setSelectedToken={setSelectedToken}
          tokens={tokens}
        />
        <div className="icon_wrapper">
          <div className="icon">
            <img src={Icon} alt="eth" />
          </div>
        </div>
        <div className="content">
          <div className="current_value">
            <span>Current value</span>
            <span className="price">
              {currentPriceSelectedToken
                ? `₹${(currentPriceSelectedToken * 80).toFixed(2)}`
                : "Getting..."}
            </span>
          </div>
          <div className="currency_dropdown">
            <button
              className="currency_dropdown_button"
              onClick={() => setIsOpen(true)}
            >
              <div className="selected_currency">
                <img src={Icon} alt="selected_currency_icon" />
                {selectedToken}
              </div>
              <div className="drop_icon">
                <img src={DropIcon} alt="drop_icon" />
              </div>
            </button>
          </div>
          <div className="amount_input">
            <label htmlFor="amount">Amount you want to invest</label>
            <input
              type="number"
              placeholder="0.00"
              id="amount"
              value={inputPrice}
              onChange={handleChange}
            />
          </div>
          <div className="currency_value">
            <label htmlFor="calculated_amount">
              Estimate Number of {selectedToken} You will Get
            </label>
            <input
              type="number"
              disabled
              placeholder="0.00"
              value={calculatedPrice}
            />
          </div>
          <button className="buy_button">Buy</button>
        </div>
      </div>
    </>
  );
};

export default TradeCard;
