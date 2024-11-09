import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {Provider} from 'react-redux';
import {store} from './Services/store';
import Router from "./Services/router";
import {LanguageProvider} from "./Services/i18n";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <LanguageProvider>
        <Provider store={store}>
            <React.StrictMode>
                <Router/>
            </React.StrictMode>
        </Provider>
    </LanguageProvider>
);