import React, {useContext, useState, useEffect} from 'react'
import {createStackNavigator} from "@react-navigation/stack";
import axios from 'axios';
import faker from "faker";
import tailwind from 'tailwind-rn';
import {AuthContext} from "../Auth/AuthProvider";
import {
    Text,
    TouchableOpacity,
    FlatList,
    Button,
    View,
} from "react-native";

import {Center} from "./Center";
import {addProductRoutes} from "./addProductRoutes";

axios.defaults.baseURL = 'http://backstage.party.test';

const Stack = createStackNavigator();

function Products({navigation}) {
    const {user} = useContext(AuthContext);
    const [name, setName] = useState(null);

    useEffect(() => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;

        axios.get('user')
            .then(response => {
                setName(response.data.name);
            })
            .catch(error => console.log(error));
    }, []);

    return (
        <Center>
            <View style={tailwind('bg-teal-200 py-3 w-full items-center')}>
                <Text style={tailwind('text-teal-900')}>
                    Hello {name}
                </Text>
            </View>
            <FlatList
                style={tailwind('bg-teal-100 w-full')}
                renderItem={({item}) => {
                    return (
                        <Button title={item} onPress={() => {
                            navigation.navigate("Product", {
                                name: item
                            });
                        }} />
                    )
                }}
                keyExtractor={(product, idx) => product + idx}
                data={Array.from(Array(50), () => faker.commerce.product())}
            />
        </Center>
    )
}

export const HomeStack = ({}) => {
    const {logout} = useContext(AuthContext);
    return (
        <Stack.Navigator
            initialRouteName='Products'
            screenOptions={{
                headerTintColor: '#ffffff',
                headerStyle: {backgroundColor: "#0f9b8e"},
            }}
        >
            {addProductRoutes(Stack)}
            <Stack.Screen
                name='Products'
                component={Products}
                options={{
                    headerRight: () => {
                        return (
                            <TouchableOpacity
                                style={{
                                    paddingRight: 10
                                }}
                                onPress={() => {
                                    logout();
                                }}>
                                <Text style={{
                                    color: '#ffffff',
                                    fontSize: 16,
                                    fontWeight: 'bold'
                                }}>
                                    Logout
                                </Text>
                            </TouchableOpacity>
                        )
                    }
                }}
            />
        </Stack.Navigator>
    );
}
