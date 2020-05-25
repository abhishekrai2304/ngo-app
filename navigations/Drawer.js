import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../Screens/Home';
import Notifications from '../Screens/Notifications';
const Drawer = props=>{
    function HomeScreen({ navigation }) {
        return (
         <Home move  />
        );
      }
      
      function NotificationsScreen({ navigation }) {
        return (
         <Notifications move = {navigation}/>
        );
      }
      const Drawer1 = createDrawerNavigator();
      return(
        <NavigationContainer>
        <Drawer1.Navigator
         initialRouteName="Home"
         drawerStyle ={ {
            //backgroundColor:'#f7287b',
            
         }}
         >
          <Drawer1.Screen name="Home" component={HomeScreen} />
          <Drawer1.Screen name="Notifications" component={NotificationsScreen} />
        </Drawer1.Navigator>
      </NavigationContainer>
      );
};
const styles = StyleSheet.create({

});
export default Drawer;