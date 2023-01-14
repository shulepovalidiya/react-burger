import React, {useEffect, useState} from 'react';
import './App.module.css';
import AppHeader from "../app-header/app-header";
import Main from "../main/main";
import '@ya.praktikum/react-developer-burger-ui-components';

function App() {

    const BASE_URL = 'https://norma.nomoreparties.space/api';

    const [ingredientsArray, setIngredientsArray] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getIngredientsArray = () => {
        setIsLoading(true);
        fetch(`${BASE_URL}/ingredients`)
            .then(res => res.json())
            .then(res => {
                setIngredientsArray(res.data)
                setIsLoading(false)
            })
            .catch(err => {
                console.log(err)
                setIsLoading(false)
            })
    }

    useEffect(getIngredientsArray, [])

    return (
        <>
            <AppHeader/>
            {!isLoading && <Main data={ingredientsArray}/>}
            <div id="modals"></div>
        </>
    );
}


export default App;
