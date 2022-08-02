// import { List } from "./pages/Article";
import "./index.css";
// import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Dev } from "./pages/Dev"
import { Provider as UrqlProvider, createClient, defaultExchanges } from "urql";

const urql = createClient({
  url: import.meta.env.VITE_GRAPHQL_URL,
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
        /*<Route path="/" element={<Navigate to="/articles" />} />*/
        <Route path="articles" element={<Dev />} />
      </Routes>
    </BrowserRouter>
  );
}
