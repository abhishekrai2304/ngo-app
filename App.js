import React, { useState } from 'react';
import { StyleSheet} from 'react-native';
import {Asset} from 'expo-asset';
import {AppLoading} from 'expo';
import COVID from './app/index';
import SignUp from './app/Signup';
import firebase from 'firebase';
import LoginSuccess from './app/LoginSuccess';
import ForgetPass from './app/ForgetPass';
import SetPass from './app/SetPass';
import Developers from './Screens/Developer';
import Dummy from './app/dummy';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import MainTab from './Screens/MainTab';
import { DrawerContent } from './Screens/DrawerContent';
import Settings from './Screens/Settings';
import SignIn from './app/SignIn';
import Chat from './Components/Chat';
import { createStackNavigator } from 'react-navigation-stack'
import {createAppContainer} from 'react-navigation';

console.disableYellowBox = true;

var config={
  apiKey: "xxxxxxxxxxxxxxxxx",
  authDomain: "login2-6d807.firebaseapp.com",
  databaseURL: "https://login2-6d807.firebaseio.com",
  projectId: "login2-6d807",
  storageBucket: "login2-6d807.appspot.com",
  messagingSenderId: "803075299968",
  appId: "1:803075299968:web:7abd54fb0b5a88d3e92465",
  measurementId: "G-VPMHGQ9VLC"
};
if(!(firebase.apps.length)){
  const fb = firebase.initializeApp(config);}


const loadResourcesAsync = async () => {
  return Promise.all([
    Asset.fromModule(require('./assets/logo.jpg')).downloadAsync()
    ])
}

const Drawer = createDrawerNavigator();

const navigator = createStackNavigator({
  //   Main: { screen: Main },
     Chat: { screen: Chat },
   });

export default function App() {
    
  const [state, setState] = useState(false);
  const [start, setStart] = useState(true);
  const [signin, setsignin] = useState(false);
  const [success, setsuccess] = useState(false);
  const [signup, setsignup] = useState(false); 
  const [forget, setforget] = useState(false);
  const [password, setpassword] = useState(false);
  const [userforgot, setuserforgot] = useState('');
  const [s, sets] = useState(false);
  const [userName, setUser] = useState('');
  const [eMail, setmail] = useState('');
  const [URi, setUrL] = useState('http://lh6.googleusercontent.com/-9q3p6hB0GD0/AAAAAAAAAAI/AAAAAAAAAJY/9FZ8gS3q-wU/photo.jpg?sz=257');


  const signinhandler = (username, password) => {
     var user;
     var pass;
     setUser(username);
     firebase.database().ref(username).once('value',(data)=>{
      if(data.val() != null){
      user = data.val().Username.trim()
      pass = data.val().Password.trim() 
      email = data.val().Email.trim()
      if((user === username) && (pass === password)){
        setsuccess(true);
        setsignin(true);
        setStart(false);
        setmail(email);
      }
      else{
        alert("Warning ! Enter Correct Password", [{ text: 'Ok', style: 'cancel' }])
      }
    } else {
      alert("Enter correct username!", [{ text: 'Ok', style: 'cancel' }])
    }
    });
    firebase.storage().ref().child(username).getDownloadURL().then(onResolve, onReject);
  
  };

  function onResolve(url) {
    setUrL(url);
  }

  function onReject(error) {
    setUrL('http://lh6.googleusercontent.com/-9q3p6hB0GD0/AAAAAAAAAAI/AAAAAAAAAJY/9FZ8gS3q-wU/photo.jpg?sz=257');
  }

 
  const signuphandler = () => {
    setsignup(true);
    setsignin(false);
    setStart(false);
  };

  const signuphandler1 = (name, email, pass) => {
      firebase.database().ref(name).set({
        Username:name,
        Email:email,
        Password:pass
      }).then(()=>{
      alert("Successfull!")
      setsignin(true);
      setsignup(false);
      setsuccess(false);
      setStart(false);
      });
    
   };

   
const forgetHandler = () => {
  setforget(true);

};
 
const cancelHandler = () => {
  setsignup(false);
  setsignin(true);
  setsuccess(false);
  setforget(false);
  setpassword(false);
  setStart(false);
};

const submitHandler = (username) => {
  var data1 = null;
    
  firebase.database().ref(username).once('value', (data) => {
    
    if (data.val() == data1) {
      alert("Warning!", "Please Enter Valid Username...", [{ text: 'Ok', style: 'cancel' }])
    }
    else {
      setforget(false);
      setpassword(true);
      setuserforgot(username);
      
    }
  })}
  
const onchangepasswordhandler = (password, cpassword) => {

      
      firebase.database().ref(userforgot).update({
        Password: password
      }).then(() => {
        setsignup(false);
        setsignin(true);
        setStart(false);
        setsuccess(false);
        setforget(false);
        setpassword(false);
      })
   
 
};
const shand = () => {
  sets(true);
};

const outHandler = () => {
        setsignup(false);
        setsignin(false);
        setStart(true);
        setsuccess(false);
        setforget(false);
        setpassword(false);
}

const startHandler = () => {
    setStart(false);
    setsignin(true);
}

    if (!state) {
      return (
        <AppLoading
          startAsync = {loadResourcesAsync}
          onFinish={() => setState(true)}
          onError={console.warn}
        />
      );
    }else if(s){
      return(<Dummy/>)
    } else if(forget){
      return(<ForgetPass onSubmit = {submitHandler} onCancel = {cancelHandler} />);
    }else if(password){
      return(<SetPass onSubmit = {onchangepasswordhandler} onCancel = {cancelHandler}/>);
    } else if(signup){
    return(  
      <SignUp onsignup1={signuphandler1} onsignin = {cancelHandler} />
    );
    }else if(signin && success) {
      return( <NavigationContainer Email = {eMail} Username = {userName}>
        <Drawer.Navigator initialRouteName="Home" drawerContent = {props => <DrawerContent {...props} Email = {eMail} Username = {userName} url = {URL}  onOut = {outHandler}/>}>
         <Drawer.Screen name="HomeDrawer" component={MainTab}/>
         <Drawer.Screen name="Support" component={Developers} /> 
         <Drawer.Screen name="Chat" component={Chat}  />  
         </Drawer.Navigator>
     
      
     </NavigationContainer>);
    }else if(signin) {
      return(
        <SignIn Onsignup = {signuphandler} onSign = {signinhandler} onforget = {forgetHandler}/>
      );
    }
   else if(start) {
      return(
        <COVID onStart = {startHandler}/>
      );
     
    }
    
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
