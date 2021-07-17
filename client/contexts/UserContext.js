import React, { createContext, useState } from 'react';

// Create a Context
export const UserContext = createContext(false);
// Returns an object with 2 values:
// { Provider, Consumer }
// const UserContextProvider = (props) => {
//     const [isLoggedIn, setIsLoggedIn] = useState(false);

//     return <UserContext.Provider value={{ isLoggedIn }}>
//         {props.children}
//     </UserContext.Provider>
// }
// export default UserContextProvider;