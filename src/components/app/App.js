import React, {useEffect, useState, useContext, createContext} from 'react';
import './App.module.css';
import AppHeader from "../app-header/app-header";
import Main from "../main/main";
import '@ya.praktikum/react-developer-burger-ui-components';
import api from "../../utils/api";
export const IngredientsContext = createContext([]);

function App() {

    const [ingredientsArray, setIngredientsArray] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getIngredientsArray = () => {
        setIsLoading(true);
        api.getIngredientsArray()
            .then(res => setIngredientsArray(res.data))
            .catch(err => console.log(err))
            .finally(() => setIsLoading(false))
    }

    useEffect(getIngredientsArray, [])

    return (
        <>
            <AppHeader/>
            {!isLoading && (
                <IngredientsContext.Provider value={ingredientsArray}>
                    <Main />
                </IngredientsContext.Provider>
                )
            }

        </>
    );
}


export default App;
