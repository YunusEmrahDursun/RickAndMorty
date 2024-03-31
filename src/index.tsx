import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from 'react-redux';
import App from "./App";
import {store} from "store";

import "styles/style.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render( <Provider store={store} children={<App />}/> );
       
   
