import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {Provider} from 'react-redux';
import {store} from './store.ts';
import Router from "./Services/router.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <React.StrictMode>
            <Router/>
        </React.StrictMode>
    </Provider>
);