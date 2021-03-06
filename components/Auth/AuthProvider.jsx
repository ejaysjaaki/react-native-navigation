import React, {createContext, useState} from 'react'
import * as SecureStore from "expo-secure-store";
import axios from 'axios';

axios.defaults.baseURL = 'http://backstage.party.test';

export const AuthContext = createContext({
    user: null,
    login: () => {
    },
    setUser: () => {
    },
    logout: () => {
    },
});

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                error,
                login: (email, password) => {
                    axios.post('sanctum/token', {email, password, device_name: 'mobile'}).then(response => {
                        const userResponse = {
                            email: response.data.user.email,
                            token: response.data.token,
                        }
                        setUser(userResponse);
                        setError(null);
                        SecureStore.setItemAsync('user', JSON.stringify(userResponse), {});
                    }).catch(error => {
                        console.log(error.message);
                        const key = Object.keys(error.response.data.errors)[0];
                        setError(error.response.data.errors[key][0]);
                    })
                },
                logout: () => {
                    axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;

                    axios.post('logout')
                        .then(response => {
                            setUser(null);
                            SecureStore.deleteItemAsync('user', {})
                        })
                        .catch(error => {
                            console.log(error.message);
                        })
                }
            }}>
            {children}
        </AuthContext.Provider>
    );
}
