import React, {useRef, useState, useEffect} from 'react';
import {Button, Text, TouchableOpacity} from 'react-native';
import {Center} from "./Center";

function Product({route, navigation}) {
    return (
        <Center>
            <Text>{route.params.name}</Text>
            <Button
                title="Edit this product"
                onPress={() =>
                    navigation.navigate('EditProduct', {
                        name: route.params.name,
                    })
                }
            />
        </Center>
    )
}

function apiCall(x = 'test') {
    return x;
}

function EditProduct({route, navigation}) {
    const [formState] = useState('');
    const submit = useRef(() => {
    });

    submit.current = () => {
        // api call with new form state
        apiCall(formState)
        navigation.goBack();
    }

    useEffect(() => {
        navigation.setParams({submit})
    }, [])

    return (
        <Center>
            <Text>editing {route.params.name}...</Text>
        </Center>
    )
}

export const addProductRoutes = (Stack) => {
  return (
    <>
        <Stack.Screen
            options={({route}) => ({
                headerTitle: `Edit: ${route.params.name}`,
                headerRight: () => (
                    <TouchableOpacity style={{paddingRight: 8}}>
                        <Text
                            onPress={() => {
                                // submit the form
                                if (route.params.submit) {
                                    route.params.submit.current()
                                }
                            }}
                            style={{color: '#ffffff'}}>
                            Done
                        </Text>
                    </TouchableOpacity>
                )
            })}
            name='EditProduct'
            component={EditProduct}
        />
        <Stack.Screen
            name='Product'
            options={({route}) => ({
                headerTitle: `Product: ${route.params.name}`
            })}
            component={Product}
        />
    </>
  )
};
