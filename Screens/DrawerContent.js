import React, { useState } from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {
  useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    TextInput,
    Text,
    TouchableRipple,
    Switch

} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from 'firebase';
import {
    DrawerContentScrollView,
    DrawerItem,
  
} from '@react-navigation/drawer';
import { TouchableOpacity } from 'react-native-gesture-handler';

 export function DrawerContent(props) {
 const [email, setemail] = useState('');  
var config={
  apiKey: "AIzaSyBkpt6HFwXiU09qrc7Jk1BvWLGsDx5U9j4",
  authDomain: "login2-6d807.firebaseapp.com",
  databaseURL: "https://login2-6d807.firebaseio.com",
  projectId: "login2-6d807",
  storageBucket: "login2-6d807.appspot.com",
  messagingSenderId: "803075299968",
  appId: "1:803075299968:web:7abd54fb0b5a88d3e92465",
  measurementId: "G-VPMHGQ9VLC"
};
if(!(firebase.apps.length)){
firebase.initializeApp(config);
}
   const [isDarkTheme, setIsDarkTheme] = useState(false);
   const [URL, setUrL] = useState('http://lh6.googleusercontent.com/-9q3p6hB0GD0/AAAAAAAAAAI/AAAAAAAAAJY/9FZ8gS3q-wU/photo.jpg?sz=257');


   const toggleTheme = () => {
     setIsDarkTheme(!isDarkTheme);
   }

   const emailfetch = () => {
    firebase.database().ref(props.Username).once('value',(data)=>{
      setemail(data.val().Email.trim());
    });
   
        firebase.storage().ref().child(props.Username).getDownloadURL().then(onResolve, onReject);      
  }

  function onResolve(url) {
      setUrL(url);
  }

  function onReject(error) {
    setUrL('http://lh6.googleusercontent.com/-9q3p6hB0GD0/AAAAAAAAAAI/AAAAAAAAAJY/9FZ8gS3q-wU/photo.jpg?sz=257');
  }

  const paperTheme = useTheme();
    return(
        <View style = {{flex:1}} onTouchStart = {emailfetch}>
           <DrawerContentScrollView {...props}>
               <View style = {styles.drawerContent}>
          <View style = {styles.userInfoSection}>
          <Drawer.Section style = {styles.drawerSection}>
              <View style = {{ marginTop:15, justifyContent: "center", alignItems: "center"}}>
                  <Avatar.Image 
                  source = {{uri : URL}}
                  size = {100}
                  />
                  
                  <View style = {{flexDirection:'column', marginLeft:15,justifyContent: "center", alignItems: "center"}}>
               <Title style = {styles.title}>{props.Username}</Title>
                <Caption style= {styles.caption}>{email}</Caption>
                      </View>
                  </View>
                </Drawer.Section>
              </View>
              <Drawer.Section style = {styles.drawerSection}>
              <DrawerItem
              icon = {({color, size})=>(
                <Icon
                name = "home"
                size = {size}
                color = {color}  
                />
              )
            }
              label = 'Home'
              onPress = {()=>{props.navigation.navigate('Home')}}
              />

               <DrawerItem
              icon = {({color, size})=>(
                <Icon
                name = "user-circle-o"
                size = {size}
                color = {color}  
                />
              )
            }
              label = 'Profile'
              onPress = {()=>{props.navigation.navigate('Profile', {Email: email,URL: URL, Username: props.Username})}}
              />
               <DrawerItem
              icon = {({color, size})=>(
                <Icon
                name = "comments-o"
                size = {size}
                color = {color}  
                />
              )
            }
              label = 'Chats'
              onPress = {()=>{props.navigation.navigate('Chat')}}
              />
                </Drawer.Section>
                <DrawerItem
              icon = {({color, size})=>(
                <Icon
                name = "users"
                size = {size}
                color = {color}  
                />
              )
            }
              label = 'Developer'
              onPress = {()=>{props.navigation.navigate('Support')}}
              />
            </View>
           
          </DrawerContentScrollView >
          <Drawer.Section style = {styles.bottomDrawerSection}>
              <DrawerItem
              icon = {({color, size})=>(
                <Icon
                name = "sign-out"
                size = {size}
                color = {color}  
                />
              )
            }
              label = 'Sign-out'
              onPress = {()=>{props.onOut()}}
              />
                  
              
                </Drawer.Section>

            </View>
    );
};
const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });