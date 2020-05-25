import React from 'react';
import { View, Button, StyleSheet, Image, Dimensions, ImageBackground } from 'react-native';
import { Container, Header, Content, Card, CardItem, Body, Text, Left, Thumbnail } from 'native-base';
import Colors from '../Constants/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TouchableRipple } from 'react-native-paper';
let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;

const Bookmarks = () => {
  const image = {uri:"https://reactjs.org/logo-og.png"}
  return (
    
    <Container>
     
      <Header style={{ backgroundColor: 'white' }}>
        <Text style={{ margin: 15, fontWeight: 'bold', fontSize: 22 }}>Our NGOs</Text>
      </Header>
      <Content style={{ margin: 10, backgroundColor: 'white' }}>
     
        <Card style={{ alignItems: 'center', padding: 10 }}>
        
      <TouchableOpacity>
      {/* <ImageBackground source = {require('../assets/bg.jpg')}style={styles.image}> */}
          <Card style={{ width: 'auto', height: height * 0.45, paddingBottom: 10, elevation: 3,backgroundColor:Colors.cadetBlue }}>
            <CardItem style = {{backgroundColor:Colors.cadetBlue}}>
              <Left>
              
                <Body>
                  <Text style={{ fontWeight: 'bold' }} >Abhay Yuva Kendra </Text>
                </Body>
              </Left>
            </CardItem>
           
            <CardItem cardBody style={{ paddingLeft: 10, backgroundColor:Colors.cadetBlue }}>
              <Text style={{ fontWeight: 'bold' }}>A Mumbai based NGO which spans around 10 cities of Maharashtra is concerened towards providing food to the needy.</Text>


            </CardItem>
            <CardItem cardBody style={{ paddingLeft: 10, backgroundColor:Colors.cadetBlue }}>
              <Text style={{ fontWeight: 'bold' }}>{'\n'}Mr.Abhishek V. Rai{'\n\n'} Ph:  8169381150{'\n\n'}  Email:  raiav19.comp@coep.ac.in</Text>
            </CardItem>
            <CardItem style = {{backgroundColor:Colors.cadetBlue}}>
              <Button title = "See More"/>
              </CardItem>
          </Card>
          {/* </ImageBackground> */}
          </TouchableOpacity>
          <TouchableOpacity>
          <Card style={{ width: 'auto', paddingBottom: 10, height: height * 0.45, backgroundColor:Colors.wheat }}>
            <CardItem style = {{backgroundColor:Colors.wheat}}>
              <Left>
              
                <Body>
                  <Text style={{ fontWeight: 'bold' }} >Adarsh Jankalyan </Text>
                </Body>
              </Left>
            </CardItem>
           
            <CardItem cardBody style={{ paddingLeft: 10, backgroundColor:Colors.wheat }}>
              <Text>A Mumbai based NGO which spans around 10 cities of Maharashtra is concerened towards providing food to the needy.</Text>


            </CardItem>
            <CardItem cardBody style={{ paddingLeft: 10, backgroundColor:Colors.wheat }}>
              <Text>{'\n'}Mr.Abhishek V. Rai{'\n\n'} Ph:  8169381150{'\n\n'}  Email:  raiav19.comp@coep.ac.in</Text>
            </CardItem>
            <CardItem style = {{backgroundColor:Colors.wheat}}>
              <Button title = "See More"/>
              </CardItem>
          </Card>
</TouchableOpacity>
<TouchableOpacity>
          <Card style={{ width: 'auto', paddingBottom: 10, height: height * 0.45,backgroundColor:Colors.powderBlue }}>
            <CardItem style = {{backgroundColor:Colors.powderBlue}}>
              <Left>
              
                <Body>
                  <Text style={{ fontWeight: 'bold' }} >Adarsh Jankalyan </Text>
                </Body>
              </Left>
            </CardItem>
           
            <CardItem cardBody style={{ paddingLeft: 10, backgroundColor:Colors.powderBlue }}>
              <Text>A Mumbai based NGO which spans around 10 cities of Maharashtra is concerened towards providing food to the needy.</Text>


            </CardItem>
            <CardItem cardBody style={{ paddingLeft: 10, backgroundColor:Colors.powderBlue }}>
              <Text>{'\n'}Mr.Abhishek V. Rai{'\n\n'} Ph:  8169381150{'\n\n'}  Email:  raiav19.comp@coep.ac.in</Text>
            </CardItem>
            <CardItem style = {{backgroundColor:Colors.powderBlue}}>
              <Button title = "See More"/>
              </CardItem>
          </Card>
</TouchableOpacity>

<TouchableOpacity>
          <Card style={{ width:'auto', paddingBottom: 10, height: height * 0.45,backgroundColor:Colors.peachpuff }}>
            <CardItem style = {{backgroundColor:Colors.peachpuff}}>
              <Left>
              
                <Body>
                  <Text style={{ fontWeight: 'bold' }} >Adarsh Jankalyan </Text>
                </Body>
              </Left>
            </CardItem>
           
            <CardItem cardBody style={{ paddingLeft: 10, backgroundColor:Colors.peachpuff }}>
              <Text>A Mumbai based NGO which spans around 10 cities of Maharashtra is concerened towards providing food to the needy.</Text>


            </CardItem>
            <CardItem cardBody style={{ paddingLeft: 10, backgroundColor:Colors.peachpuff }}>
              <Text>{'\n'}Mr.Abhishek V. Rai{'\n\n'} Ph:  8169381150{'\n\n'}  Email:  raiav19.comp@coep.ac.in</Text>
            </CardItem>
            <CardItem style = {{backgroundColor:Colors.peachpuff}}>
              <Button title = "See More"/>
              </CardItem>
          </Card>
</TouchableOpacity>


<TouchableOpacity>
          <Card style={{ width: 'auto', paddingBottom: 10, height: height * 0.45,backgroundColor:Colors.silver }}>
            <CardItem style = {{backgroundColor:Colors.silver}}>
              <Left>
              
                <Body>
                  <Text style={{ fontWeight: 'bold' }} >Adarsh Jankalyan </Text>
                </Body>
              </Left>
            </CardItem>
           
            <CardItem cardBody style={{ paddingLeft: 10, backgroundColor:Colors.silver }}>
              <Text>A Mumbai based NGO which spans around 10 cities of Maharashtra is concerened towards providing food to the needy.</Text>


            </CardItem>
            <CardItem cardBody style={{ paddingLeft: 10, backgroundColor:Colors.silver }}>
              <Text>{'\n'}Mr.Abhishek V. Rai{'\n\n'} Ph:  8169381150{'\n\n'}  Email:  raiav19.comp@coep.ac.in</Text>
            </CardItem>
            <CardItem style = {{backgroundColor:Colors.silver}}>
              <Button title = "See More"/>
              </CardItem>
          </Card>
</TouchableOpacity>

        </Card>
       
      </Content>
     
    </Container>
  
  );
};

export default Bookmarks;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image:{
    //flex: 1,
    //resizeMode: "cover",
    justifyContent: "center"
  }
});