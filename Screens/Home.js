import React, { useState }  from 'react';
import { View, Text, Button, StyleSheet, ScrollView, Image, ImageBackground,Dimensions, FlatList } from 'react-native';
import { Container, Header, Content, Card, CardItem, Body, Left,Right, Thumbnail } from 'native-base';
import Colors from '../Constants/Colors';
import Cards from '../Components/Card';
import { TouchableOpacity, PanGestureHandler } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import firebase from 'firebase';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import MaterialIcons from 'react-native-vector-icons/FontAwesome';

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;
let em;
let cn;
let de;
let nm;
let ct;
var firebaseConfig = {
  apiKey: "AIzaSyBkpt6HFwXiU09qrc7Jk1BvWLGsDx5U9j4",
  authDomain: "login2-6d807.firebaseapp.com",
  databaseURL: "https://login2-6d807.firebaseio.com",
  projectId: "login2-6d807",
  storageBucket: "login2-6d807.appspot.com",
  messagingSenderId: "803075299968",
  appId: "1:803075299968:web:7abd54fb0b5a88d3e92465",
  measurementId: "G-VPMHGQ9VLC"
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}
const Home = ({ route, navigation }) => {
  const [Names, setnames] = useState([]);
  const [ngoname, setngoname] = useState('');
  const [once, setonce] = useState(true);
  const [on, seton] = useState(true);
  const [visible, setvisible] = useState(true)
  const [email, setemail] = useState('')
  const [name, setname] = useState('')
  const [contact, setcontact] = useState('')
  const [des, setdes] = useState('')
  const [start, setstart] = useState(false)
  const [cit, setcit] = useState('')
  let img;
  let img1;
  let city = ""
  let even = 0;
  let odd = 0;
  for (let i in route.params) {
    city += route.params[i]
  }

  if (city === "" && on) {

    const listItems = ["Akola", "Amravati", "Aurangabad", "Ahmednagar", "Beed", "Bhusaval", "Chandrapur", "Dhule", "Gondia", "Hinganghat",
      "Ichalkaranji", "Jalgaon", "Kolhapur", "Latur", "Malegaon", "Nagpur", "Nashik", "Nandurbar", "Mumbai", "Miraj", "Osmanabad", "Pune",
      "Panvel", "Solapur", "Sangli", "Satara", "Thane", "Udgir", "Wardha", "Yavatmal"];

    for (listcity in listItems) {
      let cities = listItems[listcity];
      firebase.database().ref('NGO/' + cities).once('value', (data) => {
        const ab = data.exportVal()
        //console.log(ab)


        for (const key in ab) {
          //console.log(Ab)
          //console.log(ab.Contact)
          if (ab.hasOwnProperty(key)) {

            firebase.database().ref('NGO/' + cities + '/' + key).once('value', (dat) => {
              //console.log(dat)
              em = dat.val().Email
              cn = dat.val().Contact
              de = dat.val().Description
              nm = dat.val().Name
              ct = dat.val().City
              //console.log("Hello",em,cn,de,nm,ct)
              even = even + 1
              if (even % 3 == 1) {
                setnames(currentngo => [...currentngo, { id: cities, value: [key, ct, cn, em, de, "lightcyan"] }]);
              }
              else if(even % 3 == 2) {
                setnames(currentngo => [...currentngo, { id: cities, value: [key, ct, cn, em, de, "lightskyblue"] }]);
              }else if(even %3==0){
                setnames(currentngo => [...currentngo, { id: cities, value: [key, ct, cn, em, de, "lightpink"] }]); 
              }

            })


          }
        }
      })
    }
    seton(false);
  }
  else if (city && once) {
    setnames([])
    firebase.database().ref('NGO/' + city).once('value', (data) => {
      const ab = data.exportVal()
      console.log(ab)
      for (const key in ab) {
        if (ab.hasOwnProperty(key)) {
          firebase.database().ref('NGO/' + city + '/' + key).once('value', (dat) => {
            //console.log(dat)
            em = dat.val().Email
            cn = dat.val().Contact
            de = dat.val().Description
            nm = dat.val().Name
            ct = dat.val().City
            //console.log("Hello", em, cn, de, nm, ct)
            odd=odd+1
            if (odd % 3 == 1) {
              setnames(currentngo => [...currentngo, { id: city, value: [key, ct, cn, em, de, "lightcyan"] }]);
            }
            else if(odd % 3 == 2) {
              setnames(currentngo => [...currentngo, { id: city, value: [key, ct, cn, em, de, "lightskyblue"] }]);
            }
            else if(odd % 3 == 0){
              setnames(currentngo => [...currentngo, { id: city, value: [key, ct, cn, em, de, "lightpink"] }]); 
            }
          })
        }
      }
    })
    setonce(false)
    setstart(true);
  }

  const Pagehandler = (item, itemid) => {
    console.log(item, itemid)
    setngoname(item);
    firebase.database().ref('NGO/' + itemid + '/' + item).once('value', (data) => {
      setvisible(false);
      setcontact(data.val().Contact)
      setname(data.val().Name)
      setdes(data.val().Description)
      setcit(data.val().City)
      setemail(data.val().Email)
    })
    setvisible(false)
  }

  const visibilityhandler = () => {
    setvisible(true)
  }


  if (visible && !(start)) {
    return (
      <Container>
     
      <Header style={{ backgroundColor: 'white' }}>
        <Text style={{ margin: 10, fontWeight: 'bold', fontSize: 24 }}>Our NGO's</Text>
      </Header>
      <Content style={{ margin: 2, backgroundColor: 'white'}}>
     
      <Card style={{alignItems: 'center', padding: -50 }}>
        
      <ScrollView >
        <View style={styles.screen}>
          <View style={{ backgroundColor: '' }}>
          </View>
          <View>
            <FlatList
              data={Names}
              renderItem={({ item }) =>
                <TouchableOpacity activeOpacity ={1}>
                  {/* <ImageBackground source = {require('../assets/bg.jpg')}style={styles.image}> */}
                  <Card style={{width:'auto', shaowRadius: 15, padding: 5, elevation: 5, backgroundColor: item.value[5], borderRadius: 25 }}>
                    <CardItem style={{ backgroundColor:item.value[5] , alignItems:'center', justifyContent: 'center'}}>
                      <Right>
                        <Body>
                          <Text style={{ fontWeight: 'bold', fontSize: 19 }}>{item.value[0]} </Text>
                        </Body>
                      </Right>
                    </CardItem>

                    <CardItem cardBody style={{ paddingLeft: 10, backgroundColor:item.value[5] }}>
                      <Text style = {{fontWeight: '700', fontSize: 15}} >{item.value[4][0]}{item.value[4][1]}{item.value[4][2]}{item.value[4][3]}{item.value[4][4]}{item.value[4][5]}{item.value[4][6]}
                        {item.value[4][7]}{item.value[4][8]}{item.value[4][9]}{item.value[4][10]}{item.value[4][11]}{item.value[4][12]}{item.value[4][13]}
                        {item.value[4][14]}{item.value[4][15]}{item.value[4][16]}{item.value[4][17]}{item.value[4][18]}{item.value[4][19]}{item.value[4][19]}
                        {item.value[4][20]}{item.value[4][21]}{item.value[4][22]}{item.value[4][23]}{item.value[4][24]}{item.value[4][25]}{item.value[4][26]}
                        {item.value[4][27]}{item.value[4][28]}{item.value[4][29]}{item.value[4][30]}{item.value[4][31]}{item.value[4][32]}{item.value[4][33]}
                        {item.value[4][34]}{item.value[4][35]}{item.value[4][36]}{item.value[4][37]}{item.value[4][38]}........</Text>


                    </CardItem>
                    <CardItem cardBody style={{ paddingLeft: 10, backgroundColor:item.value[5] }}>
                      <Text style ={{fontSize: 15, fontWeight: '650'}}  >{'\n'}City : {item.value[1]} {'\n\n'}Ph: {item.value[2]}{'\n\n'}Email:  {item.value[3]}</Text>
                    </CardItem>
                    <CardItem style={{ backgroundColor: item.value[5] }}>
                    <TouchableOpacity onPress={Pagehandler.bind(this, item.value[0], item.value[1])}>
                       <LinearGradient 
                            colors = {['cornflowerblue', 'blue']}
                            style = {styles.signIn}
                       >
                                <Text style ={styles.textSign}>See More</Text>
                                <MaterialIcons name = "angle-double-right" color="#fff" size={20}/>
                        </LinearGradient>
                      </TouchableOpacity>
                    </CardItem>
                  </Card>
                  {/* </ImageBackground> */}
                </TouchableOpacity>}
            />
          </View>
        </View>
      </ScrollView>
     
      </Card>
       
       </Content>
      
     </Container>
    );
  }
  else if (visible && Names.length > 0) {
    return (
      <Container>
     
      <Header style={{ backgroundColor: 'white'}}>
        <Text style={{ margin: 10, fontWeight: 'bold', fontSize: 24 }}>Our NGOs</Text>
      </Header>
      <Content style={{ margin: 5, backgroundColor: 'white' }}>
     
        <Card style={{ alignItems: 'center', padding: 10 }}>
      <ScrollView>
        <View style={styles.screen}>
          <View style={{ backgroundColor: '' }}>
          </View>
          <View>
            <FlatList
              data={Names}
              renderItem={({ item }) =>
                <TouchableOpacity activeOpacity ={1}>
                  {/* <ImageBackground source = {require('../assets/bg.jpg')}style={styles.image}> */}
                  <Card style={{width:'auto', shaowRadius: 15, padding: 10, elevation: 5, backgroundColor: item.value[5], borderRadius:15 }}>
                    <CardItem style={{ backgroundColor:item.value[5], alignItems:'center', justifyContent: 'center' }}>
                      <Right>
                        <Body>
                          <Text style={{ fontWeight: 'bold', fontSize: 19 }}>{item.value[0]} </Text>
                        </Body>
                      </Right>
                    </CardItem>

                    <CardItem cardBody style={{ paddingLeft: 10, backgroundColor:item.value[5] }}>
                      <Text style = {{fontWeight: '700', fontSize: 15}}>{item.value[4][0]}{item.value[4][1]}{item.value[4][2]}{item.value[4][3]}{item.value[4][4]}{item.value[4][5]}{item.value[4][6]}
                        {item.value[4][7]}{item.value[4][8]}{item.value[4][9]}{item.value[4][10]}{item.value[4][11]}{item.value[4][12]}{item.value[4][13]}
                        {item.value[4][14]}{item.value[4][15]}{item.value[4][16]}{item.value[4][17]}{item.value[4][18]}{item.value[4][19]}
                        {item.value[4][20]}{item.value[4][21]}{item.value[4][22]}{item.value[4][23]}{item.value[4][24]}{item.value[4][25]}{item.value[4][26]}
                        {item.value[4][27]}{item.value[4][28]}{item.value[4][29]}{item.value[4][30]}{item.value[4][31]}{item.value[4][32]}{item.value[4][33]}
                        {item.value[4][34]}{item.value[4][35]}{item.value[4][36]}{item.value[4][37]}{item.value[4][38]}........</Text>


                    </CardItem>
                    <CardItem cardBody style={{ paddingLeft: 10, backgroundColor: item.value[5]}}>
                      <Text style ={{fontSize: 15, fontWeight: '650'}} >{'\n'}City : {item.value[1]} {'\n\n'}Ph: {item.value[2]}{'\n\n'}Email:  {item.value[3]}</Text>
                    </CardItem>
                    <CardItem style={{ backgroundColor: item.value[5] }}>
                      <TouchableOpacity onPress={Pagehandler.bind(this, item.value[0], item.value[1])}>
                       <LinearGradient 
                            colors = {['cornflowerblue', 'blue']}
                            style = {styles.signIn}
                       >
                                <Text style ={styles.textSign}>See More</Text>
                                <MaterialIcons name = "angle-double-right" color="#fff" size={20}/>
                        </LinearGradient>
                      </TouchableOpacity>
                    </CardItem>
                  </Card>
                  {/* </ImageBackground> */}
                </TouchableOpacity>}
            />
          </View>
        </View>
      </ScrollView>
      </Card>
       
       </Content>
      
     </Container>
    );
  }
  else if (visible && (Names.length == 0) && start) {
    return (
      <Container>
     
      <Header style={{ backgroundColor: 'white' }}>
        <Text style={{ margin: 10, fontWeight: 'bold', fontSize: 22 }}>Our NGOs</Text>
      </Header>
      <Content style={{ margin: 5, backgroundColor: 'white' }}>
      <Card style={{ alignItems: 'center', padding: 150 }}>
      <Card style={{ width:200,height:100,paddingTop:50,paddingBottom:70,paddingLeft:35,paddingRight:35, elevation: 15, backgroundColor:"#ffdab9", shaowRadius: 15,borderRadius:15 }}>
                    <CardItem style={{ backgroundColor:"#ffdab9"}}>
                      <Left>

                        <Body>
                          <Text style={{ fontWeight: 'bold' } } textAlign="center">Sorry No NGO Found! </Text>
                        </Body>
                      </Left>
                    </CardItem>
    </Card>
   </Card>
       
       </Content>
      
     </Container>
    );
  }
  else if (!visible) {
    return (
      <Container>
        <Content style={{ margin: 10, backgroundColor: 'white' }}>
          <Card >
            <CardItem>
              <Left>
                <Thumbnail source={{ uri: 'https://api.adorable.io/avatars/50/abott@adorable.png' }} />
                <Body>
                  <Text style={{ fontWeight: 'bold' }} >{name} </Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image source={require("../assets/Aashapura.jpg")} style={{ height: 150, flex: 1 }} />
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Left>
                <Thumbnail source={{ uri: 'https://api.adorable.io/avatars/50/abott@adorable.png' }} />
                <Body>
                  <Text style={{ fontWeight: 'bold' }} >{name} </Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Text> {des} </Text>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Left>
                <Thumbnail source={{ uri: 'https://api.adorable.io/avatars/50/abott@adorable.png' }} />
                <Body>
                  <Text style={{ fontWeight: 'bold' }} >{name} </Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Text>Ph:  {contact}{'\n\n'}Email/Website:  {email} {'\n\n'} City: {cit}</Text>
            </CardItem>
          </Card>
          <View style={styles.backcontainer}>
            <TouchableOpacity onPress={visibilityhandler}>
                       <LinearGradient 
                            colors = {['darkblue', 'blue']}
                            style = {styles.signIn}
                       >
                                <MaterialIcons name = "angle-double-left" color="#fff" size={20}/>
                                <Text style ={styles.textSign}>Back</Text>

                        </LinearGradient>
                      </TouchableOpacity>
          </View>
        </Content>
      </Container>

    );
  }

};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 70,
    alignItems: 'center',
  },
  inputContainer: {
    width: 'auto',
    maxWidth: '120%',
    alignItems: 'center',
    height: 'auto',
    margin: 15,
  },
  cardContainer: {
    flexDirection: 'row',
  },
  imgContainer: {
    width: '120%',
    height: 200,
    maxWidth: '120%',
    padding: 10,
  },
  image: {

    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    borderRadius: 10,
    width: 900,
    maxWidth: '95%',
    height: 200,
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
      fontWeight: 'bold',
      paddingLeft: 10,
      paddingRight: 10
  },
  buttonContainer: {
    flexDirection: 'row',
    flex: 1,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  backcontainer: {
    paddingBottom: 10, paddingTop: 10, width: '100%', alignItems: 'center'
  }
});
export default Home;