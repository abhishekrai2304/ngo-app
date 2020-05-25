import React from 'react';
import { View, Image, Dimensions } from 'react-native';
import { Container, Header, Content, Card, CardItem, Body, Text, Left, Thumbnail } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;

const Developers = () => {
    return (
        <Container >
            <LinearGradient colors = {['blue', '#fff']} style = {{backgroundColor:'white', alignItems:'center', flexDirection: "row"}}>
                <Icon name = "angle-double-right" size = {25} color ="black" style={{paddingLeft: 10}}/>
                <Text style = {{margin: 15,paddingLeft: 80, fontWeight:'bold', fontSize:22}}>Our Developers</Text>
            </LinearGradient>
            <Content style={{ margin: 10, backgroundColor: 'white' }}>
                <Card style = {{alignItems:'center' , padding:10}}>

                    <Card  style={{ width: width * 0.80, paddingBottom:10}}>
                        <CardItem>
                            <Left>
                                <Thumbnail source={{ uri: 'https://api.adorable.io/avatars/50/abott@adorable.png' }} />
                                <Body>
                                    <Text style={{ fontWeight: 'bold' }} >Abhishek Rai </Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem>
                            <Image source={require('../assets/assets/mypic.jpg')} style={{ height: 200, width: null, flex: 1 }} />
                        </CardItem>
                        <CardItem cardBody style={{ paddingLeft: 10 }}>
                                <Text>Abhishek is a 2nd Year Btech student from College of Engineering, Pune.He is a Computer Science student and shows interest towards Development of Solutions for Social Welfare.</Text>


                            </CardItem>
                            <CardItem cardBody style={{ paddingLeft: 10 }}>
                                <Text>{'\n'}Mr.Abhishek V. Rai{'\n\n'} Ph:  8169381150{'\n\n'}  Email:  raiav19.comp@coep.ac.in</Text>
                            </CardItem>
                    </Card>

                    <Card  style={{ width: width * 0.80,  paddingBottom:10}}>
                    <CardItem>
                            <Left>
                                <Thumbnail source={{ uri: 'https://api.adorable.io/avatars/50/abott@adorable.png' }} />
                                <Body>
                                    <Text style={{ fontWeight: 'bold' }} >Harsha Rathi </Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem>
                            <Image source={require('../assets/assets/harsha.jpg')} style={{ height: 200, width: null, flex: 1 }} />
                        </CardItem>
                        <CardItem cardBody style={{ paddingLeft: 10 }}>
                                <Text>Harsha  a 2nd Year Btech student from College of Engineering Pune, is a Computer Science student and shows her Concerns towards building solutions for Society.</Text>
                                

                            </CardItem>
                            <CardItem cardBody style={{ paddingLeft: 10 }}>
                                <Text>{'\n'}Mrs.Harsha S. Rathi{'\n\n'} Ph:  7020927351{'\n\n'}  Email:  rathihs19.comp@coep.ac.in</Text>
                            </CardItem>
                    </Card>

                    <Card  style={{ width: width * 0.80, paddingBottom:10}}>
                    <CardItem>
                            <Left>
                                <Thumbnail source={{ uri: 'https://api.adorable.io/avatars/50/abott@adorable.png' }} />
                                <Body>
                                    <Text style={{ fontWeight: 'bold' }} >Divya Kharode </Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem>
                            <Image source={require('../assets/assets/divya.jpg')} style={{ height: 200, width: null, flex: 1 }} />
                        </CardItem>
                        <CardItem cardBody style={{ paddingLeft: 10 }}>
                                <Text>Divya too a 2nd Year Btech student from College of Engineering, Pune.She is a Computer Science student and shows great interest towards Development of Scientific Applications.</Text>
                                

                            </CardItem>
                            <CardItem cardBody style={{ paddingLeft: 10 }}>
                                <Text>{'\n'}Mrs.Divya M. Kharode{'\n\n'} Ph:  9623568915{'\n\n'}  Email:  kharodedm19.comp@coep.ac.in</Text>
                            </CardItem>
                    </Card>


                </Card>
            </Content>
        </Container>
    );
};
export default Developers;