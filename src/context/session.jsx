import {createContext, useEffect, useState} from 'react';

function getInitialState () {
    let selectedOption = sessionStorage.getItem( 'darkmode' ) ||  true;
    if (typeof selectedOption !== "boolean") {
        selectedOption = (selectedOption === 'true');
    }

    return {
        currentPage: window.location.pathname,
        search: {
            term: "",
            type: "",
            page: 1,
            totalPages: 1,
            totalResults: 0,
        },
        api: {
            apiKey: "db1a3d4fc9949395b6300a619305310d",
            apiUrl: "https://api.themoviedb.org/3/",
        },
        darkmode: selectedOption
    };
}

// Create context
export const SessionContext = createContext(null);

export function SessionProvider ({children}) {
    const [sessionData, setSessionData] = useState(getInitialState());
    //console.log(sessionData);

    return (
        <SessionContext.Provider value={{sessionData, setSessionData}}>
            {children}
        </SessionContext.Provider>
    );
}

