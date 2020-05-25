import React, { Component, useState } from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';
import styles from './style';

console.ignoredYellowBox = [
    'Setting a timer'
  ]

const Dummy = (props)  => {
    const [name, setName] = useState(false);

    const inputHandler = () => {
        setName(true);
    }

    if(name) {
        return(
        <View style={{justifyContent: "center", alignItems: "center", marginTop: 300}}>
            <Text>Heyy name set to {name}</Text>
        </View>
        );
    }

    return (
        <View style={{justifyContent: "center", alignItems: "center", marginTop: 300}}>
        <Button title = "Test" onPress = {inputHandler}/>
         </View>
    );
}

export default Dummy;