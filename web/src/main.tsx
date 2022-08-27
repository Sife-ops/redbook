import './index.css'
import 'twin.macro';
import GlobalStyles from './styles/global-styles';
import ReactDOM from 'react-dom/client';
import dancingBaby from './assets/dancing-baby.gif';
import decode from 'jwt-decode';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Error } from './component/page/error';
import { Prediction } from './component/page/prediction';
import { Predictions } from './component/page/predictions';
import { Provider as UrqlProvider, createClient, defaultExchanges } from 'urql';

const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get('token');

const { VITE_GRAPHQL_URL } = import.meta.env;

const urql = createClient({
  url: token ? VITE_GRAPHQL_URL + '?token=' + token : VITE_GRAPHQL_URL,
  exchanges: defaultExchanges
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  /*<React.StrictMode>*/
  <UrqlProvider value={urql}>
    <GlobalStyles />
    <App />
  </UrqlProvider>
  /*</React.StrictMode>*/
);

function App() {
  let user;
  if (token) {
    user = decode<{ userId: string; avatar: string }>(token!);
  }

  return (
    <BrowserRouter>
      <div>
        <img src={dancingBaby} tw="absolute w-16" />
        <img src={dancingBaby} tw="absolute w-16 right-0" />
        <h1 tw="text-center text-4xl mb-4">REDBOOK</h1>
      </div>
      <Routes>
        <Route
          path="/prediction/:predictionId"
          // @ts-ignore
          element={<Prediction user={user} />}
        />
        <Route path="/user/:userId" element={<Predictions />} />
        <Route path="/error" element={<Error />} />
        <Route path="*" element={<Navigate to="/error" />} />
      </Routes>
    </BrowserRouter>
  );
}
