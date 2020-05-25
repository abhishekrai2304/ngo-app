import React, { useState, component } from 'react';
import { View, Text, Button, StyleSheet, FlatList, Keyboard,TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../Screens/Home';
import Colors from '../Constants/Colors';
import Notifications from '../Screens/Notifications';
import Profile from '../Screens/Profile';
import Explore from '../Screens/Explore';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import { TextInput } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import { State } from 'react-native-gesture-handler';
//import NGOINFO from '../Screens/NGOINFO';
const HomeStack = createStackNavigator();
const NotificationsStack = createStackNavigator();
const NGOINFOSTACK =  createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const MainTab = (route) => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor='#fff'

    >
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarColor: Colors.niceGreen,
          tabBarIcon: ({ color }) => (
            <Icon name="ios-home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationsStackScreen}
        options={{
          tabBarLabel: 'Notifications',
          tabBarColor: Colors.darkBlue,
          tabBarIcon: ({ color }) => (
            <Icon name="ios-notifications" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        initialParams={"hello"}
        options={{
          tabBarLabel: 'Profile',
          tabBarColor: Colors.purple,
          tabBarIcon: ({ color }) => (
            <Icon name="ios-person" color={color} size={26} />
          ),
        }}
      />
     
      <Tab.Screen
        name="Explore"
        component={Explore}
        options={{
          tabBarLabel: 'Explore',
          tabBarColor: '#d02860',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-aperture" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
const HomeStackScreen = ({ navigation }) => {
  //  const setState = {
  //     searchBarFocused:true
  //   }
  const [searchBarFocused, setSearchBarFocused] = useState(true);
  const listItems = ["Akola", "Amravati", "Aurangabad", "Ahmednagar", "Beed", "Bhusaval", "Chandrapur", "Dhule", "Gondia", "Hinganghat",
    "Ichalkaranji", "Jalgaon", "Kolhapur", "Latur", "Malegaon", "Nagpur", "Nashik", "Nandurbar",
    "Mumbai", "Miraj", "Osmanabad", "Pune", "Panvel", "Solapur", "Sangli", "Satara", "Thane", "Udgir", "Wardha", "Yavatmal"];
  const [search, setSearch] = useState(false);
  const [searchvalue, setsearchvalue] = useState('')
  const [city, setcity] = useState('')
  const handleSearch = () => {
    setSearch(true);
  }

  const pagehandler = (item1) => {
    setsearchvalue(item1);
    setcity(item1);
    setSearch(false)
   // console.log(item1)
  }
  const changehandler = (item1) => {
    //console.log(city)
    setsearchvalue(item1)
    setcity(item1)
    setSearch(false)
  }

  if (search) {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ height: 80, backgroundColor: Colors.niceGreen, justifyContent: 'center', paddingHorizontal: 5 }}>
          <Animatable.View animation="slideInRight" duration={500} style={{ height: 60, backgroundColor: 'white', padding: 5, }}>

            <TextInput
              placeholder="Search"
              style={{ fontSize: 24, marginLeft: 15, flex: 1 }}
            />

          </Animatable.View>
        </View>
        <FlatList
          style={{ backgroundColor: { searchBarFocused } ? 'rgba(0,0,0,0.3)' : 'white' }}
          data={listItems}
          renderItem={({ item }) => <TouchableOpacity onPress={pagehandler.bind(this, item)}>
            <View>
              <Text style={{ padding: 20, fontSize: 20 }}>{item}</Text>
            </View>
          </TouchableOpacity>}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
  return (
    <HomeStack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: '#009387'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    }}>
      <HomeStack.Screen name="Home" initialParams={city} component={Home}  options={{
        // title:'hello',
        headerLeft: () => (
          <Icon.Button name="ios-menu" size={30}
            backgroundColor={Colors.niceGreen}
            onPress={() => navigation.openDrawer()}
          />
        ),
        headerRight: () => (
          <Icon.Button name="ios-search" size={30}
            backgroundColor={Colors.niceGreen}
            onPress={handleSearch}//does not do anything
          />
        )
      }} />

    </HomeStack.Navigator>
  );

}


const NotificationsStackScreen = ({ navigation }) => {
  return (
    <NotificationsStack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: Colors.darkBlue,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    }}>
      <NotificationsStack.Screen name="Notifications" component={Notifications}  
        options={{
          headerLeft: () => (
            <Icon.Button name="ios-menu"
              size={30}
              backgroundColor={Colors.darkBlue}
              onPress={() => navigation.openDrawer()}
            />
          )
        }}
      />

    </NotificationsStack.Navigator>
   
  );
}


      
export default MainTab;