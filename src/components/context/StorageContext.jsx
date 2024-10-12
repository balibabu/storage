import React, { createContext, useEffect, useState } from 'react';
import { FileProvider } from './FileContext';
import { CurrentProvider } from './CurrentContext';

const StorageContext = createContext();
export default StorageContext;

export const StorageProvider = ({ children }) => {

    return (
        <CurrentProvider>
            <FileProvider>
                <StorageContext.Provider value={{}}>
                    {children}
                </StorageContext.Provider>
            </FileProvider>
        </CurrentProvider>
    );
};
