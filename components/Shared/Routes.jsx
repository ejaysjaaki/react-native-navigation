import React, {useState, useEffect, useContext} from 'react'
import {NavigationContainer} from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import {
    ActivityIndicator,
} from 'react-native';

import {Center} from "./Center";
import {AuthContext} from "../Auth/AuthProvider";
import {AppTabs} from "./AppTabs";
import {AuthStack} from "./AuthStack";

export const Routes = ({}) => {
    const { user, setUser} = useContext(AuthContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // check if the user is logged in or not
        SecureStore.getItemAsync('user')
            .then(userString => {
                if (userString) {
                    let userObject = JSON.parse(userString)
                    setUser(userObject);
                }
                setLoading(false);
            })
            .catch(error => {
                console.log(error.message);
            })
    }, []);

    if (loading) {
        return (
            <Center>
                <ActivityIndicator size="large" />
            </Center>
        )
    }

    return (
        <NavigationContainer>
            {user ? <AppTabs /> : <AuthStack />}
        </NavigationContainer>
    );
}
