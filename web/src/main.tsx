// import "./index.css";
import GlobalStyles from './styles/global-styles';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Error } from "./pages/error";
import { Prediction } from './pages/prediction';
import { Predictions } from './pages/predictions';
import { Provider as UrqlProvider, createClient, defaultExchanges } from "urql";

const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get('token');

const { VITE_GRAPHQL_URL } = import.meta.env;

const urql = createClient({
  url: token
    ? VITE_GRAPHQL_URL + '?token=' + token
    : VITE_GRAPHQL_URL,
  exchanges: defaultExchanges
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  /*<React.StrictMode>*/
  <UrqlProvider value={urql}>
    <GlobalStyles />
    <App />
  </UrqlProvider>
  /*</React.StrictMode>*/
);

function App() {
  return (
    <BrowserRouter>
      <h1>REDBOOK</h1>
      <Routes>
        <Route path="/prediction/:predictionId" element={<Prediction />} />
        <Route path="/user/:userId" element={<Predictions />} />
        <Route path="/error" element={<Error />} />
        <Route path="*" element={<Navigate to="/error" />} />
      </Routes>
    </BrowserRouter>
  );
}
