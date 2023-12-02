import React, { createContext } from 'react';

const intialContext = {
    darkmode: true
};

// Create context
export const SessionContext = createContext(intialContext);

