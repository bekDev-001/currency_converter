import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { liveCurrency } from "./redux/reducers/currencySymbol";
import Navbar from "./Components/Navbar/Navbar.jsx";
import Loading from "./Components/Loading/Loading.jsx";
const LazyHome = React.lazy(() => import("./Pages/Home/Home.jsx"));
const LazyDetails = React.lazy(() => import("./Pages/Details/Details.jsx"));
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const currencyRedux = useSelector((state) => state.currency.value);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(
      "https://api.ipdata.co?api-key=6594d349ade8317c6a50b8dba1cc0ef3c0adf0d4ef46e5460cbbadd9&fields=currency"
    )
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        dispatch(liveCurrency(res?.currency?.code));
      });
  }, []);

  return (
    <div className="container">
      <Loading />
      <Navbar />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <React.Suspense>
              <LazyHome />
            </React.Suspense>
          }
        />
        <Route
          path="/details"
          element={
            <React.Suspense fallback="Loading...">
              <LazyDetails />
            </React.Suspense>
          }
        />
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;
