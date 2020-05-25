import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

console.ignoredYellowBox = [
    'Setting a timer'
  ]

const {width,height}=Dimensions.get('window');

const Profile = (props) => {
  let [selectedImage, setSelectedImage] = React.useState(null);

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled === true) {
      return;
    }

    setSelectedImage({ localUri: pickerResult.uri });
  };

 

  if (selectedImage !== null) {
    return (
      <View style={styles.container}>
        <Image source={{ uri: selectedImage.localUri }} style={styles.thumbnail} />
        <TouchableOpacity onPress={openImagePickerAsync} style={{marginLeft:150, bottom: 50}}>
        <Image source = {require("../assets/plus.png")} style ={{borderRadius: 100}}/>
      </TouchableOpacity> 
      <View style = {styles.oct}>
      <View style={{...styles.section, marginBottom: -200}}>
        <Image source = {require('../assets/name.png')}  
        style = {styles.ImageStyle} />
        <View style = {{flexDirection: 'column'}}>
        <Text style = {{color: 'gray'}}>Name:</Text>
      <Text style={{fontSize: 15, marginLeft: 10}}>{props.userName}</Text>
      </View>
    </View>
    <View style={{...styles.section}}>
        <Image source = {require('../assets/email.png')}  
        style = {styles.ImageStyle} />
    <View style = {{flexDirection: 'column'}}>
     <Text style = {{color: 'gray'}}>Email:</Text>
      <Text style={{fontSize: 15, marginLeft: 10}}>{props.Email}</Text>
      </View>
    </View>
    </View>
      </View>
      
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: 'https://i.imgur.com/TkIrScD.png' }} style={styles.thumbnail} />
        <TouchableOpacity onPress={openImagePickerAsync} style={{marginLeft:150, bottom: 40}}>
        <Image source = {require("../assets/plus.png")} style ={{borderRadius: 100}}/>
      </TouchableOpacity>
    
      <View style = {styles.oct}>
      <View style={{...styles.section, marginBottom: -200}}>
        <Image source = {require('../assets/name.png')}  
        style = {styles.ImageStyle} />
        <View style = {{flexDirection: 'column'}}>
        <Text style = {{color: 'gray'}}>Name:</Text>
      <Text style={{fontSize: 15, marginLeft: 10}}>{props.userName}</Text>
      </View>
    </View>
    <View style={{...styles.section}}>
        <Image source = {require('../assets/email.png')}  
        style = {styles.ImageStyle} />
    <View style = {{flexDirection: 'column'}}>
     <Text style = {{color: 'gray'}}>Email:</Text>
      <Text style={{fontSize: 15, marginLeft: 10}}>{props.Email}</Text>
      </View>
    </View>
    </View>
    </View>
  );
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100
  },
  oct: {
      flex: 1,
      justifyContent: "flex-start",
      alignItems: "flex-start"
  },
  ImageStyle:{
    padding: 10,
    margin: 5,
    resizeMode : 'stretch',
    alignItems: 'center'
},
  thumbnail: {
    width: 250,
    height: 250,
    resizeMode: 'cover',
    borderRadius: 450,
  },
  section: { 
    flex: 1,
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center', 
    borderRadius: 30 ,
    top: -150,
},
});
