import React, {useContext, useState} from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import {AuthContext} from "../Auth/AuthProvider";
import {
    Button,
    Text,
    TextInput,
} from 'react-native';

import {Center} from "./Center";

const Stack = createStackNavigator()

function Login({navigation}) {
    const {login, error} = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <Center>
            {error && <Text style={{color: 'red', marginBottom: 24}}>{error}</Text>}
            <TextInput
                style={{height: 40, width: 300, borderColor: '#dddddd', borderWidth: 1, padding: 8, marginBottom: 10, marginTop: 10, borderRadius: 5}}
                onChangeText={text => setEmail(text)}
                placeholder="email"
                autoCompleteType='email'
                autoCapitalize='none'
            />
            <TextInput
                style={{height: 40, width: 300, borderColor: '#dddddd', borderWidth: 1, padding: 8, borderRadius: 5}}
                onChangeText={text => setPassword(text)}
                placeholder="Password"
                secureTextEntry={true}
            />

            <Button title="Login"
                    onPress={() => {
                        login(email, password);
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
