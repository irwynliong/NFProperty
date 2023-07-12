import React, { useState, useEffect } from "react";
import ConnectWallet from "../../ConnectWallet";
import Form from "../../pages/Form";


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