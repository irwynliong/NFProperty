import React, { useState } from "react";

const AccountContext = React.createContext();

function AccountContextProvider({ children }) {
    const [account, setAccount] = useState('');

    return (
      <AccountContext.Provider value={[account, setAccount]}>
        {children}
      </AccountContext.Provider>
    );
  }
  
  export { AccountContextProvider, AccountContext };