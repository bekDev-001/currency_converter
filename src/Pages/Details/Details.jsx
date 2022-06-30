import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { liveCurrency } from "../../redux/reducers/currencySymbol";

import "./style.css";

const Details = () => {
  const currencyRedux = useSelector((state) => state.currency.value);
  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [selectData, setSelectData] = useState("");
  console.log(selectData);

  useEffect(() => {
    const options = { method: "GET", headers: { Accept: "application/json" } };
    fetch(
      `https://api.fastforex.io/fetch-all?from=${currencyRedux}&api_key=42fc2d84bf-d7df888da3-reanas`,
      // /fetch-all?from=USD&api_key=42fc2d84bf-d7df888da3-reanas
      options
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response.results);
        setData(response.results);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleSelect = (e) => {
    setSelectData(e.target.value);
    dispatch(liveCurrency(e.target.value));
  };

  return (
    <div className="details-container">
      <div className="currency-option">
        <select
          name="currency"
          id="currency"
          value={selectData}
          onChange={(e) => handleSelect(e)}
        >
          <option value={currencyRedux}>{currencyRedux}</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="UZS">UZS</option>
          <option value="RUB">RUB</option>
        </select>
      </div>
      <div className="currency-wrapper">
        <div>
          {Object.entries(data)
            .slice(0, 75)
            .map((item, index) => (
              <div className="currency-item" key={index}>
                1 {currencyRedux} = {item[1].toFixed(2)} {item[0]}
              </div>
            ))}
        </div>
        <div>
          {Object.entries(data)
            .slice(75)
            .map((item, index) => (
              <div className="currency-item" key={index}>
                1 {currencyRedux} = {item[1].toFixed(2)} {item[0]}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Details;
