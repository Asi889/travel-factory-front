"use client"
import { createContext, useContext, useState } from "react";
export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [appss, setAppss] = useState([]);
    const [translations, setTranslations] = useState([]);
    const [selectedApp, setSelectedApp] = useState(null);

    const addApp = (newApp) => {
        setAppss([...appss, newApp]);
    }
    const addTranslation = (newTranslation) => {
        setTranslations([...translations, newTranslation]);
    }


    return (
        <DataContext.Provider value={{ appss, translations, addApp, addTranslation, setAppss, setTranslations, selectedApp, setSelectedApp }}>
            {children}
        </DataContext.Provider>
    )

}
export const useDataContext = () => useContext(DataContext);