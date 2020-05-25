import React, {Component} from 'react';
import {View, Text, StyleSheet,Image, Dimensions, TextInput, TouchableOpacity} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

console.ignoredYellowBox = [
    'Setting a timer'
]

const COVID = (props) => {
    return(
        <View style = {styles.container}>
            <Animatable.View animation="fadeIn" style = {styles.header}>
                <Animatable.Image
                    animation = "bounceIn"
                    duration = {1500}
                    source = {require('../assets/logo1.jpg')}
                    style = {{...styles.logo, borderRadius: 100}}
                    resizeMode = "stretch"
                />
                <Text style = {styles.title}>CoFeed</Text>
            </Animatable.View>
            <Animatable.View animation="fadeInUpBig"  style={styles.footer}>
                <Text style = {styles.title}>Stay Connected With NGO's!</Text>
                <Text style = {styles.text}>Sign in with account</Text>
                <View style = {styles.button}>
                <TouchableOpacity onPress = {() => props.onStart()}>
                       <LinearGradient 
                            colors = {['#08d4c4', '#01ab9d']}
                            style = {styles.signIn}
                       >
                                <Text style ={styles.textSign}>Get Started</Text>
                                <MaterialIcons name = "navigate-next" color="#fff" size={20}/>
                        </LinearGradient>
                </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
    );
}

export default COVID;

const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#009387'
  },
  header: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center'
  },
  footer: {
      flex: 1,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingVertical: 50,
      paddingHorizontal: 30
  },
  logo: {
      width: height_logo,
      height: height_logo
  },
  title: {
      color: '#05375a',
      fontSize: 30,
      fontWeight: 'bold'
  },
  text: {
      color: 'grey',
      marginTop:5
  },
  button: {
      alignItems: 'flex-end',
      marginTop: 30
  },
  signIn: {
      width: 150,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
      flexDirection: 'row'
  },
  textSign: {
      color: 'white',
      fontWeight: 'bold'
  }
});
