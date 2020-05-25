import React from 'react';
import {View, StyleSheet} from 'react-native';
const Card = props =>{
return (<View style ={ {...styles.card, ...props.style}}>{props.children}</View>
    );//we can pass anything coz of props.children
};
const styles = StyleSheet.create({
    card:{
       
        shadowColor:'black',
        shadowOffset:{width:0, height:2},
        shadowOpacity:0.26,
        shadowRadius:6,
        backgroundColor:'white',
        elevation:8,//for android
        padding:20,
        borderRadius:10,
    },
});
export default Card;