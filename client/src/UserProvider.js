import { createContext, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
    const [isAuthorized, setIsAuthorized] = useState(false);

    const handleAuthorize = () => {
        setIsAuthorized(!isAuthorized)
    }

    return (
        <UserContext.Provider
            value={{isAuthorized, handleAuthorize}}
        >
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;