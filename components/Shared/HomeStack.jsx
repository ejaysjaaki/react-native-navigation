import React, {useContext, useState, useEffect} from 'react'
import {createStackNavigator} from "@react-navigation/stack";
import axios from 'axios';
import {MaterialCommunityIcons, EvilIcons} from '@expo/vector-icons';

import tailwind from 'tailwind-rn';
import {AuthContext} from "../Auth/AuthProvider";
import {
    FlatList,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import {Center} from "./Center";
import {addProductRoutes} from "./addProductRoutes";

axios.defaults.baseURL = 'http://backstage.party.test';
const Stack = createStackNavigator();


function Products({navigation}) {
    const {user} = useContext(AuthContext);
    const [name, setName] = useState(null);
    const [events, setEvents] = useState('');

    useEffect(() => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;

        axios.get('user')
            .then(response => {
                setName(response.data.name);
            })
            .catch(error => console.log(error.message));
    }, []);

    useEffect(() => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;

        axios.get('events')
            .then(response => {
                setEvents(response.data);
            })
            .catch(error => console.log(error.message));
    }, []);

    return (
        <Center>
            <View style={tailwind('bg-teal-200 py-3 w-full items-center')}>
                <Text style={tailwind('text-teal-700')}>
                    Welcome {name}
                </Text>
            </View>
            <FlatList
                style={{width: '100%'}}
                keyExtractor={(product, idx) => product + idx}
                data={events.data}
                renderItem={({item}) => {
                    return (
                        <TouchableOpacity
                            style={{borderBottomWidth: 1, borderBottomColor: '#dddddd', flexDirection: 'row'}}
                            onPress={() => {
                                navigation.navigate("Product", {
                                    name: item.data.company
                                });
                            }}
                        >
                            <View
                                style={{
                                    borderRightWidth: 1,
                                    borderRightColor: '#dddddd',
                                    backgroundColor: '#f8f8f8',
                                    padding: 20,
                                    flex: 0
                                }}
                            >
                                <EvilIcons name="location" size={20} color="#0F9B8E" />
                            </View>
                            <View
                                style={{
                                    justifyContent: 'center',
                                    backgroundColor: '#f8f8f8',
                                    paddingLeft: 20,
                                    flex: 1
                                }}
                            >
                                <Text style={tailwind('text-gray-700')}>
                                    {item.data.company}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )
                }}
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
