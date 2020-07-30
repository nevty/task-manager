import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.css'
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {createBrowserHistory} from "history"

import firebase from "firebase/app";
import "firebase/auth"
import "firebase/database"
import {firebaseConfig} from "./firebaseConfig";

firebase.initializeApp(firebaseConfig);

let app;
firebase.auth().onAuthStateChanged(()=>{
    if (!app) {
        app = ReactDOM.render(
            <BrowserRouter history={createBrowserHistory}>
                <App/>
            </BrowserRouter>,
            document.getElementById('root')
        );
    }
})

