import React, {useContext} from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import {AuthContext} from "../Auth/AuthProvider";
import {
    Button,
    Text
} from 'react-native';

import {Center} from "./Center";

const Stack = createStackNavigator()

function Login({navigation}) {
    const {login} = useContext(AuthContext);
    return (
        <Center>
            <Text>I am a login screen</Text>
            <Button title="Log me in"
                    onPress={() => {
                        login();
                    }} />
            <Button title="Go to register"
                    onPress={() => {
                        navigation.navigate('Register')
                    }} />
        </Center>
    )
}

function Register({navigation}) {
    return (
        <Center>
            <Text>I am a register screen</Text>
            <Button title="Go to login"
                    onPress={() => {
                        navigation.navigate('Login')
                        // navigation.goBack()
                    }} />
        </Center>
    )
}

export const AuthStack = ({}) => {

    return (
        <Stack.Navigator
            screenOptions={{
                headerTintColor: '#ffffff',
                headerStyle: {backgroundColor: "#0f9b8e"},
            }}
            initialRouteName='Login'
        >
            <Stack.Screen
                name="Login"
                options={{
                    headerTitle: "Sign In",
                }}
                component={Login}
            />
            <Stack.Screen
                name="Register"
                options={{
                    headerTitle: "Sign Up"
                }}
                component={Register}
            />
        </Stack.Navigator>
    );
}
