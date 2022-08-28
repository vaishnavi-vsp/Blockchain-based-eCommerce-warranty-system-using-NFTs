import { createContext, useState } from 'react';

export const LoginContext = createContext();

const ContextProvider = ({children}) => {
    const initState = JSON.parse(localStorage.getItem('user'))
    var state;
    if(initState){
        state = initState['username']
    }else{
        state = ''
    }
    console.log("This is the state of context")
    console.log(state)
    console.log(initState)
    const [ account, setAccount ] = useState(state);
    
    return (
        <LoginContext.Provider value={{ account, setAccount }}>
            {children}
        </LoginContext.Provider>
    )
}

export default ContextProvider;