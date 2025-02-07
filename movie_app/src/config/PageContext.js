// PageContext.js
import React, { createContext, useState, useContext } from 'react';

const PageContext = createContext();

export const PageProvider = ({ children }) => {
    const [page, setPage] = useState(1);
    const [selectedLanguage, setSelectedLanguage] = useState("ml");

    return (
        <PageContext.Provider value={{ page, setPage, selectedLanguage, setSelectedLanguage }}>
            {children}
        </PageContext.Provider>
    );
};

export const usePage = () => useContext(PageContext);
