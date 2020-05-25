import React from 'react';
import {View, Button, Text, StyleSheet,Dimensions, Platform,TextInput, TouchableOpacity, StatusBar} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { set } from 'react-native-reanimated';
import { ScrollView } from 'react-native-gesture-handler';


const SignIn = (props) => {

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

    const textInputChange1 = (val) => {
        if(val.length !== 0){
            setData({
                ...data,
                email: val,
                check_textInputChange1: true
            });
        } else {
            setData({
                ...data,
                email: val,
                check_textInputChange1: false
            });
        }
    }

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

    const passCheck = () => {
        if (data.username === "" ||data.email === "" ||data.password === "" || data.c_password === "") {
            alert("Some fields are missing!", [{ text: 'Ok', style: 'cancel', backgroundColor: "Blue" }])
         }
        if (!(data.password == data.c_password)) {
            Alert.alert("WARNING !", "Password and Confirm Password should be same", [{ text: 'Ok', style: 'cancel' }]);
            setcpass('');
        }
        else {
            props.onsignup1(data.username, data.email, data.password)
        }
    }


    return(
        <View style = {styles.container}>
            <StatusBar backgroundColor = '#009387' barStyle = "light-content"/>
            <View style =  {styles.header}>
                <Text style={styles.text_header}>Register Now!</Text>
            </View>
            <Animatable.View 
                animation = "fadeInUpBig"
                style =  {styles.footer}
            >
                <Text style={styles.text_footer}>Username</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name = "user-circle"
                        color = "#05375a"
                        size = {20}
                    />
                    <TextInput
                        placeholder = "Your Username"
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
                <Text style={{...styles.text_footer, marginTop: 35}}>Email</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name = "envelope-open"
                        color = "#05375a"
                        size = {20}
                    />
                    <TextInput
                        placeholder = "Your Email"
                        style = {styles.textInput}
                        autoCapitalize = "none"
                        onChangeText = {(val) => textInputChange1(val)}
                    />
                    {data.check_textInputChange1 ? 
                    <Animatable.View animation = "bounceIn">
                    <Feather
                        name = "check-circle"
                        color = "green"
                        size = {20}
                    />
                    </Animatable.View>
                    : null}
                    
                </View>
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
                <View style = {styles.button}>
                <TouchableOpacity style = {styles.signIn} onPress = {passCheck}>
                    <LinearGradient
                        colors = {['#08d4c4', '#01ab9d']}
                        style = {styles.signIn}
                    >
                        <Text style={{...styles.textSign, color: "#fff"}}>Sign Up</Text>
                    </LinearGradient> 
                </TouchableOpacity> 
                    <TouchableOpacity
                        style = {{...styles.signIn, borderColor: '#009387', borderWidth: 1, marginTop: 15}}
                        onPress = {()=>props.onsignin()}
                    >
                            <Text style = {{...styles.textSign, color: '#009387'}}>Sign In</Text>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
    );
}

export default SignIn;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#009387'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 8,
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
    button: {
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
    }
  });