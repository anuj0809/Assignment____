import React, { useState } from "react";
import Icon from "../../assets/images/eth.png";
import CrossIcon from "../../assets/images/cross.svg";
import TickIcon from "../../assets/images/tick.svg";
import "./CurrencyDialog.css";

interface CurrencyDialogProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedToken: string;
  setSelectedToken: React.Dispatch<React.SetStateAction<string>>;
  tokens: string[];
}

const CurrencyDialog = (props: CurrencyDialogProps) => {
  const { isOpen, setIsOpen, selectedToken, setSelectedToken, tokens } = props;
  const [searchedTokens, setSearchTokens] = useState(tokens);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setSearchTokens(tokens);
    }
    setSearchTokens(
      tokens.filter(
        (each) =>
          each.toLowerCase().includes(e.target.value) ||
          each.includes(e.target.value)
      )
    );
  };

  return (
    <div className={`popup_wrapper ${isOpen && "open"}`}>
      <div className="popup_container">
        <div className="popup_header">
          <img
            src={CrossIcon}
            alt="cross_icon"
            className="cross_icon"
            onClick={() => setIsOpen(false)}
          />
        </div>
        <div className="search_input">
          <input
            type="text"
            placeholder="Search Chains"
            name="currency"
            onChange={handleSearch}
          />
        </div>
        <div className="listed_currencies">
          {searchedTokens.map((token) => (
            <div
              className={`listed_currency ${
                selectedToken === token && "selected"
              }`}
              onClick={() => {
                setSelectedToken(token);
                setIsOpen(false);
              }}
              key={token}
            >
              <div className="currency_icon">
                <img src={Icon} alt="icon" />
                {token}
              </div>
              {selectedToken === token && (
                <div className="tick">
                  <img src={TickIcon} alt="tick" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CurrencyDialog;
