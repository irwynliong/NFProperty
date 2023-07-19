import React, { useState, useEffect } from "react";

const AccountContext = React.createContext();

function AccountContextProvider({ children }) {
    const [account, setAccount] = useState('');

    React.useEffect(() => {
      const acc = sessionStorage.getItem("account");
      setAccount(acc === "null" ? "" : acc);
    }, []);
  
    React.useEffect(() => {
      sessionStorage.setItem("account", account);
    }, [account]);
    
    return (
      <AccountContext.Provider value={[account, setAccount]}>
        {children}
      </AccountContext.Provider>
    );
  }
  
  export { AccountContextProvider, AccountContext };