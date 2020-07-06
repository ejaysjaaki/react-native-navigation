import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Ionicons} from '@expo/vector-icons';
import {
    Text,
} from 'react-native';

import {Center} from "./Center";
import {HomeStack} from "./HomeStack";
import {SearchStack} from "./SearchStack";

const Tabs = createBottomTabNavigator();

export const AppTabs = ({}) => {

    return (
        <Tabs.Navigator
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = 'md-home';
                    } else if (route.name === 'Search') {
                        iconName = 'ios-search';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                }
            })}
            tabBarOptions={{
                activeTintColor: '#0f9b8e',
                inactiveTintColor: '#dddddd',
            }}
        >
            <Tabs.Screen name='Home' component={HomeStack} />
            <Tabs.Screen name='Search' component={SearchStack} />
        </Tabs.Navigator>
    );
}
