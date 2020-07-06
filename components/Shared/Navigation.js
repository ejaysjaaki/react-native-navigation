import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {FontAwesome5, Feather} from '@expo/vector-icons';

export default function Navigation() {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.navButton}>
                <FontAwesome5 name="home" size={24} color="#444444" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.navButton}>
                <Feather name="user" size={24} color="#444444" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#f8f8f8',
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
    },
    navButton: {
        padding: 20,
        fontSize: 24,
        backgroundColor: '#eeeeee'
    },
});
