import React from 'react';
import { StyleSheet, Dimensions, ScrollView, Image,View, ImageBackground, Platform, TouchableOpacity,TextInput, StatusBar } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import firebase from 'firebase';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';


const { width, height } = Dimensions.get('screen');
const thumbMeasure = (width - 48 - 32) / 3;

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
firebase.initializeApp(config);}

const Profile = ({route}) => {
  let [selectedImage, setSelectedImage] = React.useState(null);
  const {Email} = route.params;
  const {Username} = route.params;
  const {URL} = route.params;
  const [Pass, setPass] = React.useState(false);
  const [EMail, setMail] = React.useState(false);
  const [password, setpass] = React.useState('');
  const [Cpassword, setcpass] = React.useState('');
  const [email, setemail] = React.useState('');
  const [MAIL, SETMAIL] = React.useState(Email);

  const [data, setData] = React.useState({
        username: '',
        email: '',
        password: '',
        c_password: '',
        check_textInputChange: false,
        check_textInputChange1: false,
        secureTextEntry: true,
        confirm_secureTextEntry: true
});

const handlePasswordChange = (val) => {
  if(val.length !== 0) {
      setData({
          ...data,
          password: val
      });
  }
}

const handleConfirmPasswordChange = (val) => {
  if(val.length !== 0) {
      setData({
          ...data,
          c_password: val
      });
  }
}

const updateSecureTextEntry = () => {
  setData({
      ...data,
      secureTextEntry: !data.secureTextEntry
  });
}

const updateConfirmSecureTextEntry = () => {
  setData({
      ...data,
      confirm_secureTextEntry: !data.confirm_secureTextEntry
  });
}

const textInputChange = (val) => {
    if(val.length !== 0){
        setData({
            ...data,
            username: val,
            check_textInputChange: true
        });
    } else {
        setData({
            ...data,
            username: val,
            check_textInputChange: false
        });
    }
}
const submitMail = () => {
        if(data.username === "") {
            alert("Enter Email!",  [{ text: 'Ok', style: 'cancel'}])
        } else {
          firebase.database().ref(Username).update({
            Email: data.username
          }).then(() => {
            SETMAIL(data.username);
            alert("Email Updated Successfully!")
            setMail(false);
          })
        }
    }

    const changeMailHandler = () => {
      setMail(true);
    }

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

    const response = await fetch(pickerResult.uri);
    const blob = await response.blob()
    var ref = firebase.storage().ref().child(Username)
    return ref.put(blob);
  };

  const passHandler= () => {
    setPass(true);
  }

const passhandler = (pass) => {
    setpass(pass);
};
const cpasshandler = (cpass) => {
    setcpass(cpass);
};
const submit = () => {
    if(data.password === "" || data.c_password === "") {
       alert("Warning! Password or Confirm Password is missing!",  [{ text: 'Ok', style: 'cancel'}]);
    }else if(data.password === data.c_password) {      
          firebase.database().ref(Username).update({
            Password: data.password
          }).then(() => {
            alert("Password Updated Successfully!")
            setPass(false);
          })
    }
     else {
       alert("Password And Confirm Password should be same!");
    }
};

const onCancelHandler = () => {
  setPass(false);
  setMail(false);
}


if(EMail) {
  return(
    <View style = {styles.container1}>
          <StatusBar backgroundColor = '#009387' barStyle = "light-content"/>
          <View style =  {styles.header}>
              <Text style={styles.text_header}>Set Email!</Text>
          </View>
          <Animatable.View 
              animation = "fadeInUpBig"
              style =  {styles.footer}
          >
              <Text style={styles.text_footer}>Username</Text>
              <View style={styles.action}>
                  <FontAwesome
                      name = "envelope-open"
                      color = "#05375a"
                      size = {20}
                  />
                  <TextInput
                      placeholder = "Enter New Email"
                      style = {styles.textInput}
                      autoCapitalize = "none"
                      onChangeText = {(val) => textInputChange(val)}
                  />
                  {data.check_textInputChange ? 
                  <Animatable.View animation = "bounceIn">
                  <Feather
                      name = "check-circle"
                      color = "green"
                      size = {20}
                  />
                  </Animatable.View>
                  : null}
                  
              </View>
              <View style = {styles.button1}>
              <TouchableOpacity style = {styles.signIn} onPress = {submitMail}>
                  <LinearGradient
                      colors = {['#08d4c4', '#694fad']}
                      style = {styles.signIn}
                  >
                      <Text style={{...styles.textSign, color: "#fff"}}>Submit</Text>
                  </LinearGradient> 
              </TouchableOpacity>
              <TouchableOpacity
                      style = {{...styles.signIn, borderColor: '#009387', borderWidth: 1, marginTop: 15}}
                      onPress = {onCancelHandler}
                  >
                          <Text style = {{...styles.textSign, color: '#009387'}}>Cancel</Text>
                  </TouchableOpacity>
              </View>
              
          </Animatable.View>
      </View>
  );
}

if(Pass) {
  return (
    <View style = {styles.container1}>
    <StatusBar backgroundColor = '#009387' barStyle = "light-content"/>
    <View style =  {styles.header}>
              <Text style={styles.text_header}>Set Password!</Text>
          </View>
    <Animatable.View 
        animation = "fadeInUpBig"
        style =  {styles.footer}
    >
        <Text style={{...styles.text_footer, marginTop: 35}}>Password</Text>
        <View style={styles.action}>
            <FontAwesome
                name = "lock"
                color = "#05375a"
                size = {20}
            />
            <TextInput
                placeholder = "Your Password"
                style = {styles.textInput}
                secureTextEntry ={data.secureTextEntry? true : false}
                autoCapitalize = "none"
                onChangeText = {(val) => handlePasswordChange(val)}
            />
            <TouchableOpacity onPress = {updateSecureTextEntry}>
                {data.secureTextEntry?
            <Feather
                name = "eye-off"
                color = "grey"
                size = {20}
            />:
            <Feather
            name = "eye"
            color = "grey"
            size = {20}
            />}
            </TouchableOpacity>
        </View>
        <Text style={{...styles.text_footer, marginTop: 35}}>Confirm Password</Text>
        <View style={styles.action}>
            <FontAwesome
                name = "lock"
                color = "#05375a"
                size = {20}
            />
            <TextInput
                placeholder = "Your Password"
                style = {styles.textInput}
                secureTextEntry ={data.confirm_secureTextEntry? true : false}
                autoCapitalize = "none"
                onChangeText = {(val) => handleConfirmPasswordChange(val)}
            />
            <TouchableOpacity onPress = {updateConfirmSecureTextEntry}>
                {data.confirm_secureTextEntry?
            <Feather
                name = "eye-off"
                color = "grey"
                size = {20}
            />:
            <Feather
            name = "eye"
            color = "grey"
            size = {20}
            />}
            </TouchableOpacity>
        </View>
        <View style = {styles.button1}>
        <TouchableOpacity style = {styles.signIn} onPress = {submit}>
            <LinearGradient
                colors = {['#08d4c4', '#694fad']}
                style = {styles.signIn}
            >
                <Text style={{...styles.textSign, color: "#fff"}}>Set Password</Text>
            </LinearGradient> 
        </TouchableOpacity> 
        <TouchableOpacity
                      style = {{...styles.signIn, borderColor: '#009387', borderWidth: 1, marginTop: 15}}
                      onPress = {onCancelHandler}
                  >
                          <Text style = {{...styles.textSign, color: '#009387'}}>Cancel</Text>
                  </TouchableOpacity>
            
        </View>
    </Animatable.View>
</View>
  );
}

if (selectedImage !== null) {
  return (
    <Block flex style={styles.profile}>
    <Block flex>
      <ImageBackground
        source={{ uri: selectedImage.localUri }}
        style={styles.profileContainer}
        imageStyle={styles.profileImage}>
        <Block flex style={styles.profileDetails}>
          <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']} style={styles.gradient} />
        </Block>
      </ImageBackground>
    </Block>
    <Block flex style={styles.options}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Block row space="between" style={{ padding: theme.SIZES.BASE, }}>
          <Block middle>
          <FontAwesome
                    name = "user-circle"
                    color = "#05375a"
                    size = {30}
                /></Block>
          <Block flex style={{marginHorizontal: 18}}>
          <Text muted size={15}>Username:</Text>
            <Text bold size={18} style={{marginBottom: 8}}>{Username}</Text>
          </Block>
        </Block>
        <Block row  space="between" style={{ padding: theme.SIZES.BASE, }}>
          <Block middle>
          <FontAwesome
                    name = "envelope-open"
                    color = "#05375a"
                    size = {30}
                /></Block>
          <Block flex style={{marginHorizontal: 18}}>
          <Text muted size={15}>Email:</Text>
            <Text bold size={18} style={{marginBottom: 8}}>{MAIL}</Text>
          </Block>
          <TouchableOpacity onPress = {changeMailHandler}>
          <Block middle style = {{paddingTop: 20}}>
          <FontAwesome
                    name = "pencil"
                    color = "#05375a"
                    size = {25}
                /></Block></TouchableOpacity>
        </Block>
        <Block row space="between" style={{ padding: theme.SIZES.BASE, }}>
          <Block middle>
          <FontAwesome
                    name = "lock"
                    color = "#05375a"
                    size = {35}
                /></Block>
          <Block flex style={{marginHorizontal: 18}}> 
          <TouchableOpacity onPress = {passHandler}>
                   <LinearGradient 
                        colors = {['#08d4c4', '#694fad']}
                        style = {styles.signIn}
                   >
                            <Text style ={styles.textSign}>Change Password</Text>
                            <MaterialIcons name = "navigate-next" color="#fff" size={20}/>
                    </LinearGradient>
            </TouchableOpacity>
          </Block>
        </Block>
      </ScrollView>
    </Block>
  </Block>
  );
}


return (
      <Block flex style={styles.profile}>
        <Block flex>
          <TouchableOpacity onPress={openImagePickerAsync}>
          <ImageBackground
            source={{uri: URL}}
            style={styles.profileContainer}
            imageStyle={styles.profileImage}>
            <Block flex style={styles.profileDetails}>
              <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']} style={styles.gradient} />
            </Block>
          </ImageBackground>
          </TouchableOpacity>
        </Block>
        <Block flex style={styles.options}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Block row space="between" style={{ padding: theme.SIZES.BASE, }}>
              <Block middle>
              <FontAwesome
                        name = "user-circle"
                        color = "#05375a"
                        size = {30}
                    /></Block>
              <Block flex style={{marginHorizontal: 18}}>
              <Text muted size={15}>Username:</Text>
                <Text bold size={18} style={{marginBottom: 8}}>{Username}</Text>
              </Block>
            </Block>
            <Block row  space="between" style={{ padding: theme.SIZES.BASE, }}>
              <Block middle>
              <FontAwesome
                        name = "envelope-open"
                        color = "#05375a"
                        size = {30}
                    /></Block>
              <Block flex style={{marginHorizontal: 18}}>
              <Text muted size={15}>Email:</Text>
                <Text bold size={18} style={{marginBottom: 8}}>{MAIL}</Text>
              </Block>
              <TouchableOpacity onPress = {changeMailHandler}>
              <Block middle style = {{paddingTop: 20}}>
              <FontAwesome
                        name = "pencil"
                        color = "#05375a"
                        size = {25}
                    /></Block></TouchableOpacity>
            </Block>
            <Block row space="between" style={{ padding: theme.SIZES.BASE, }}>
              <Block middle>
              <FontAwesome
                        name = "lock"
                        color = "#05375a"
                        size = {35}
                    /></Block>
              <Block flex style={{marginHorizontal: 18}}> 
              <TouchableOpacity onPress = {passHandler}>
                       <LinearGradient 
                            colors = {['#08d4c4', '#694fad']}
                            style = {styles.signIn}
                       >
                                <Text style ={styles.textSign}>Change Password</Text>
                                <MaterialIcons name = "navigate-next" color="#fff" size={20}/>
                        </LinearGradient>
                </TouchableOpacity>
              </Block>
            </Block>
          </ScrollView>
        </Block>
      </Block>
    );
  
}

export default Profile;
const styles = StyleSheet.create({
  profile: {
    marginTop: Platform.OS === 'android' ? -10 : 0,
    marginBottom: 20,
  },
  container1: {
    flex: 1, 
    backgroundColor: '#694fad'
  },
  oct: {
      flex: 1,
      justifyContent:"center",
      alignItems: "center",
      height: 100
  },
  ImageStyle:{
    padding: 10,
    margin: 10,
    resizeMode : 'stretch',
    alignItems: 'center'
},   
header: {
  flex: 1,
  justifyContent: 'flex-end',
  paddingHorizontal: 20,
  paddingBottom: 50
},
footer: {
  flex: 3,
  backgroundColor: '#fff',
  borderTopLeftRadius: 30,
  borderTopRightRadius: 30,
  paddingHorizontal: 20,
  paddingVertical: 30
},
text_header: {
  color: '#fff',
  fontWeight: 'bold',
  fontSize: 30
},
text_footer: {
  color: '#05375a',
  fontSize: 18
},
action: {
  flexDirection: 'row',
  marginTop: 10,
  borderBottomWidth: 1,
  borderBottomColor: '#f2f2f2',
  paddingBottom: 5
},
actionError: {
  flexDirection: 'row',
  marginTop: 10,
  borderBottomWidth: 1,
  borderBottomColor: '#FF0000',
  paddingBottom: 5
},
textInput: {
  flex: 1,
  marginTop: Platform.OS === 'ios' ? 0 : -12,
  paddingLeft: 10,
  color: '#05375a',
},
errorMsg: {
  color: '#FF0000',
  fontSize: 14,
},
button1: {
  alignItems: 'center',
  marginTop: 50
},
signIn: {
  width: '100%',
  height: 50,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 10
},
textSign: {
  fontSize: 18,
  fontWeight: 'bold'
},
  profileImage: {
    width: width * 1.1,
    height: 'auto',
  },
  profileContainer: {
    width: width,
    height: height / 2,
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
},
  profileDetails: {
    paddingTop: theme.SIZES.BASE * 4,
    justifyContent: 'flex-end',
    position: 'relative',
  },
  profileTexts: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE * 2,
    zIndex: 2
  },
  pro: {
    backgroundColor: "blue",
    paddingHorizontal: 6,
    marginRight: theme.SIZES.BASE / 2,
    borderRadius: 4,
    height: 19,
    width: 38,
  },
  seller: {
    marginRight: theme.SIZES.BASE / 2,
  },
  options: {
    position: 'relative',
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: -theme.SIZES.BASE,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2,
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: 'center',
    width: thumbMeasure,
    height: thumbMeasure
  },
  gradient: {
    zIndex: 1,
    left: 0,
    right: 0,
    bottom: 0,
    height: '30%',
    position: 'absolute',
  },
});