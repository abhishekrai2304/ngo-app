// @flow
import React from 'react';
import {View, Text} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat'; // 0.3.0
import { LinearGradient } from 'expo-linear-gradient';
import Fire from '../Fire';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native-gesture-handler';


var alph = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
var na = Math.floor(Math.random() * 26 ) + 1 ;
type Props = {
  name?: string,
};

class Chat extends React.Component<Props> {
  static navigationOptions = ({ navigation }) => ({
    title: (navigation.state.params || {}).name || 'Chat!',
  });

  state = {
    messages: [],
  };

  get user() {
    return {
      name: alph[na],
    _id: alph[na],
    };
  }

  render() {
    return (
    
      
      <View style={{ flex: 1,backgroundColor: '#dcdcdc' }}>
      <LinearGradient
                      colors = {['blue', '#694fad']}
                      style = {{height: 50,alignItems:'center', flexDirection:'row'}}>
                   <TouchableOpacity> 
                    <Icon name = "angle-double-right" size = {25} color ="white" style={{paddingLeft: 10}}/></TouchableOpacity>
                      <Text style={{ color: "#fff", fontSize: 20, paddingLeft: 100,fontWeight:'bold'}}>Chat Portal</Text>
      </LinearGradient> 
      <GiftedChat
        messages={this.state.messages}
        onSend={Fire.shared.send}
        user={this.user}
      /></View>
     
    );
  }

  componentDidMount() {
    Fire.shared.on(message =>
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message),
      }))
    );
  }
  componentWillUnmount() {
    Fire.shared.off();
  }
}

export default Chat;
