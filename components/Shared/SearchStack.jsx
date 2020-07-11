import React, {useContext, useState} from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import {createStackNavigator} from "@react-navigation/stack";
import {addProductRoutes} from "./addProductRoutes";
import {EvilIcons, Foundation} from "@expo/vector-icons";
import axios from 'axios';
import {AuthContext} from "../Auth/AuthProvider";
import tailwind from "tailwind-rn";

const Stack = createStackNavigator()


axios.defaults.baseURL = 'http://backstage.party.test';

function Search({navigation}) {
    const {user} = useContext(AuthContext);
    const [searchResult, setSearchResult] = useState(false);
    const [show, setShow] = useState(false);

    let inputTimer = null;

    function inputHandler(enteredText) {
        if (enteredText.length >= 1) {
            clearInterval(inputTimer);

            inputTimer = setTimeout(() => {
                axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;

                axios.post('events/search', {enteredText})
                    .then(response => {
                        setSearchResult(response.data);
                        setShow(true);
                    })
                    .catch(error => console.log(error.message));
            }, 1000);
        } else {
            setShow(false);
        }
    }

    return (
        <View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Search..."
                    onChangeText={inputHandler}
                    autoCapitalize='none'
                />
            </View>

            <View style={{
                paddingBottom: 117,
            }}>
                {show ? <FlatList
                    style={{width: '100%'}}
                    keyExtractor={(product, idx) => product + idx}
                    data={searchResult.data}
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
                                        {item.data.name}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                /> : null}
            </View>
        </View>
    )
}

{/*<Button title="Search Products" onPress={() => {*/
}
{/*    setShow(true);*/
}
{/*}} />*/
}
{/*{show ? <FlatList*/
}
{/*    style={{width: '100%'}}*/
}
{/*    renderItem={({item}) => {*/
}
{/*        return (*/
}
{/*            <Button title={item} onPress={() => {*/
}
{/*                navigation.navigate("Product", {*/
}
{/*                    name: item*/
}
{/*                });*/
}
{/*            }} />*/
}
{/*        )*/
}
{/*    }}*/
}
{/*    keyExtractor={(product, idx) => product + idx}*/
}
{/*    data={Array.from(Array(50), () => faker.commerce.product())}*/
}
{/*/> : null}*/
}

export const SearchStack = () => {
    return (
        <Stack.Navigator
            initialRouteName='Search'
            screenOptions={{
                headerTintColor: '#ffffff',
                headerStyle: {backgroundColor: "#0f9b8e"},
            }}
        >
            {addProductRoutes(Stack)}
            <Stack.Screen
                name="Search"
                component={Search}
            />
        </Stack.Navigator>
    )
};

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'stretch',
        width: '100%',
    },
    textInput: {
        borderColor: '#dddddd',
        borderBottomWidth: 1,
        padding: 20,
        flex: 5,
    }
});
