import React, {useEffect, useState, useContext, createContext} from 'react';
import './App.module.css';
import AppHeader from "../app-header/app-header";
import Main from "../main/main";
import '@ya.praktikum/react-developer-burger-ui-components';

export const IngredientsContext = createContext([]);

function App() {

    const BASE_URL = 'https://norma.nomoreparties.space/api';

    const [ingredientsArray, setIngredientsArray] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getIngredientsArray = () => {
        setIsLoading(true);
        fetch(`${BASE_URL}/ingredients`)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка ${res.status}`);
            })
            .then(res => {
                setIngredientsArray(res.data)
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => setIsLoading(false));
    }

    useEffect(getIngredientsArray, [])

    return (
        <>
            <AppHeader/>
            {!isLoading && (
                <IngredientsContext.Provider value={{ingredientsArray, setIngredientsArray}}>
                    <Main />
                </IngredientsContext.Provider>
                )
            }

        </>
    );
}


export default App;
