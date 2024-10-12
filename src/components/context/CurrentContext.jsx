import React, { createContext, useEffect, useState } from 'react';

const CurrentContext = createContext();
export default CurrentContext;

export const CurrentProvider = ({ children }) => {
    const [current, setCurrent] = useState({});

    const contextData = {
        current,
    };

    return (
        <CurrentContext.Provider value={contextData}>
            {children}
        </CurrentContext.Provider>
    );
};
