import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loadingCycle } from "../../redux/reducers/loadingReducer";
import { toast } from "react-toastify";
import "./style.css";

const Home = () => {
  const dispatch = useDispatch();

  const [state, setState] = useState("");
  const [result, setResult] = useState("");
  const [query, setQuery] = useState("");

  const transforCurrency = (e) => {
    e.preventDefault();
    let allItem = state.split(" ");
    if (allItem && allItem.length === 4 && isNaN(allItem[0] * 1) === false) {
      // loading is true
      dispatch(loadingCycle(true));

      let amount = allItem?.[0];
      let from = allItem?.[1]?.toUpperCase();
      let to = allItem?.[3]?.toUpperCase();

      // fetching the data
      let myHeaders = new Headers();
      myHeaders.append("apikey", "DVmy2mdblCRMXiZBntgFNO6UN2v1ytjC");

      let requestOptions = {
        method: "GET",
        redirect: "follow",
        headers: myHeaders,
      };

      fetch(
        `https://api.apilayer.com/fixer/convert?to=${to}&from=${from}&amount=${amount}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          setResult(`${result?.result.toFixed(2)} ${result?.query?.to}`);
          setQuery(result?.query);
          setState("");

          // loading is false
          dispatch(loadingCycle(false));
        })
        .catch((error) => {
          dispatch(loadingCycle(false)),
            toast.error(`Please check the currency symbol.`, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
        });
    } else {
      toast.error("Something went wrong. \n Please check the sample", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <div className="home-container">
      <div className="header-text">Currency Converter</div>
      <div className="sample">Sample: 15 USD in UAH or 15 usd in uah</div>
      <form className="form-conatainer" onSubmit={(e) => transforCurrency(e)}>
        <input
          type="text"
          placeholder="15 USD in UAH"
          onChange={(e) => setState(e.target.value)}
          value={state}
        />
        <button type="submit">Check</button>
      </form>
      <div className="result-wrapper">
        <div className="result">
          Result: <span>{result}</span>
        </div>
        <div className="result">
          Action:{" "}
          {query ? (
            <span>
              From {query?.from} to {query?.to}
            </span>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
