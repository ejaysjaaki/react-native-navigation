import React, {useState, useEffect, useContext} from 'react'
import {NavigationContainer} from "@react-navigation/native";
import {
    ActivityIndicator,
    AsyncStorage
} from 'react-native';

import {Center} from "./Center";
import {AuthContext} from "../Auth/AuthProvider";
import {AppTabs} from "./AppTabs";
import {AuthStack} from "./AuthStack";

export const Routes = ({}) => {
    const {user, login} = useContext(AuthContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        AsyncStorage.getItem('user').then(userString => {
            if (userString) {
                // decode it
                // Login the user
                login();
            }
            setLoading(false);
        }).catch(err => {
            console.log(err);
            setLoading(false);
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
            {user ? (<AppTabs />) : (<AuthStack />)}
        </NavigationContainer>
    );
}
