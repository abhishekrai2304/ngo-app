import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
const Header = props => {
    return (
        <View style={styles.screen}>
            <Text style={styles.textcontainer}>{props.title}</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    screen: {
        backgroundColor: 'red',
        width: '100%',
        height: 130,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 30
    },
    textcontainer: {
        fontSize: 30,
        color: 'white',
        alignItems: 'center'
    }
});
export default Header;