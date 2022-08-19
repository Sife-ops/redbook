import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Dev } from "./pages/dev"
import { Error } from "./pages/error"
import { Provider as UrqlProvider, createClient, defaultExchanges } from "urql";

const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('userId');
const predictionId = window.location.pathname.split('/')[1];

const urql = createClient({
  url: import.meta.env.VITE_GRAPHQL_URL 
    + '?userId=' 
    + userId
    + '&predictionId='
    + predictionId,
  exchanges: defaultExchanges
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  /*<React.StrictMode>*/
  <UrqlProvider value={urql}>
    <App />
  </UrqlProvider>
  /*</React.StrictMode>*/
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:predictionId" element={<Dev />} />
        <Route path="/error" element={<Error />} />
        <Route path="*" element={<Navigate to="/error" />} />
      </Routes>
    </BrowserRouter>
  );
}
