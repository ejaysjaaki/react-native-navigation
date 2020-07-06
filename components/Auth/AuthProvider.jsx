import React, {useState} from 'react'
import {AsyncStorage} from "react-native";

export const AuthContext = React.createContext({
    user: null,
    login: () => {},
    logout: () => {},
});

export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);

    return (
        <AuthContext.Provider
            value={{
                user,
                login: () => {
                    const fakeUser = {username: 'bob'}
                    setUser(fakeUser);
                    AsyncStorage.setItem('user', JSON.stringify(fakeUser), () => {
                        console.log('user ' + fakeUser.username + ' set');
                    });
                },
                logout: () => {
                    setUser(null);
                    AsyncStorage.removeItem('user', () => {
                        console.log('user removed');
                    });
                }
            }}>
            {children}
        </AuthContext.Provider>
    );
}
