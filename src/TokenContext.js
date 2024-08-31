// import React, { createContext, useState, useContext } from 'react';

// // Create the context
// const TokenContext = createContext();

// // Create a provider component
// export const TokenProvider = ({ children }) => {
//   const [totalTokens, setTotalTokens] = useState(0);

//   const addTokens = (tokens) => {
//     setTotalTokens((prevTokens) => prevTokens + tokens);
//   };

//   return (
//     <TokenContext.Provider value={{ totalTokens, addTokens }}>
//       {children}
//     </TokenContext.Provider>
//   );
// };

// // Custom hook to use the TokenContext
// export const useTokenContext = () => {
//   return useContext(TokenContext);
// };



import React, { createContext, useState, useContext } from 'react';

// Create the context
const TokenContext = createContext();

// Create a provider component
export const TokenProvider = ({ children }) => {
  const [totalTokens, setTotalTokens] = useState(0);

  const addTokens = (tokens) => {
    console.log('Previous totalTokens:', totalTokens); // Log previous state
    setTotalTokens((prevTokens) => {
      const newTotal = prevTokens + tokens;
      console.log('New totalTokens:', newTotal); // Log updated state
      return newTotal;
    });
  };

  return (
    <TokenContext.Provider value={{ totalTokens, addTokens }}>
      {children}
    </TokenContext.Provider>
  );
};

// Custom hook to use the TokenContext
export const useTokenContext = () => {
  return useContext(TokenContext);
};
