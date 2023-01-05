import React from 'react';
import './App.module.css';
import AppHeader from "../app-header/app-header";
import Main from "../main/main";
import '@ya.praktikum/react-developer-burger-ui-components';
import config from "../../utils/data";

function App() {
    return (
        <>
            <AppHeader/>
            <Main data={config}/>
        </>
    );
}


export default App;
