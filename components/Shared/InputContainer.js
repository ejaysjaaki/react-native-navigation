import * as React from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from "react-native";

import {Foundation} from "@expo/vector-icons";

export default function InputContainer({placeholder}) {
    function inputHandler(enteredText) {
        console.log(enteredText);
    }

    return (
        <View style={styles.inputContainer}>
            <TextInput style={styles.textInput} placeholder={placeholder} onChangeText={inputHandler} />
            <TouchableOpacity style={styles.textInputButton}>
                <Foundation name="magnifying-glass" size={24} color="#ffffff" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'stretch',
        width: '100%',
    },
    textInput: {
        borderColor: '#dddddd',
        borderBottomWidth: 1,
        padding: 20,
        flex: 5,
    },
    textInputButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ff0789',
        flex: 1,
    }
});
