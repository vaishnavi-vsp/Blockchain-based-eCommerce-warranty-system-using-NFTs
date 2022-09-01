import { createContext, useState } from 'react';

export const LoginContext = createContext();

const ContextProvider = ({children}) => {
    const initState = JSON.parse(localStorage.getItem('user'))
    var state = ''
    if(initState){
        state = initState['username']
    }else{
        state = ''
    }
    // console.log("This is the state of context")
    // console.log(state)
    // console.log(initState)
    const [ account, setAccount ] = useState({
        account:state,
        marketplace:''
    });

    const updateMarketplace = (marketplace)=>{
        setAccount({account:'krutikabhatt',marketplace:marketplace})
        console.log("This is the updated marketplace")
        // console.log(JSON.stringify(marketplace))
    }
    
    return (
        <LoginContext.Provider value={{ account, setAccount,updateMarketplace }}>
            {children}
        </LoginContext.Provider>
    )
}

export default ContextProvider;