import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import "react-modern-drawer/dist/index.css";

import { PersistGate } from "redux-persist/integration/react";
import store, { persistedStore } from "../redux/store";
import { Provider } from "react-redux";

function MyApp({ Component, pageProps }) {
   return (
      <Provider store={store}>
         <PersistGate loading={null} persistor={persistedStore}>
            <Component {...pageProps} />
         </PersistGate>
      </Provider>
   );
}

export default MyApp;
