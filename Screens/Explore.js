
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { Dialogflow_V2 } from 'react-native-dialogflow';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';

import { dialogflowConfig } from '../env';

const BOT_USER = {
  _id: 2,
  name: 'FAQ Bot',
  avatar: 'https://i.imgur.com/7k12EPD.png'
};

class Explore extends Component {
  state = {
    messages: [
      {
        _id: 1,
        text: `Hi! I am the Help bot.\n\nHow may I help you with today?`,
        createdAt: new Date(),
        user: BOT_USER
      }
    ]
  };

  componentDidMount() {
    Dialogflow_V2.setConfiguration(
      dialogflowConfig.client_email,
      dialogflowConfig.private_key,
      Dialogflow_V2.LANG_ENGLISH_US,
      dialogflowConfig.project_id
    );
  }

  handleResponse(result) {
    let text = result.queryResult.fulfillmentMessages[0].text.text[0];
    let payload = result.queryResult.webhookPayload;
    this.showResponse(text, payload);
  }

  showResponse(text, payload) {
    let msg = {
      _id: this.state.messages.length + 1,
      text,
      createdAt: new Date(),
      user: BOT_USER
    };
    if (payload && payload.is_url) {
      msg.text = "image";
      msg.image = text;
    }
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, [msg])
    }));
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));
    let message = messages[0].text;
    Dialogflow_V2.requestQuery(
      message,
      result => this.handleResponse(result),
      error => console.log(error)
    );
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <LinearGradient
                      colors = {['#d02860', '#694fad']}
                      style = {{height: 50,alignItems:'center', flexDirection:'row'}}>
                   <TouchableOpacity> 
                    <Icon name = "angle-double-right" size = {25} color ="white" style={{paddingLeft: 10}}/></TouchableOpacity>
                      <Text style={{ color: "#fff", fontSize: 20, paddingLeft: 100,fontWeight:'bold'}}>Help Bot</Text>
                  </LinearGradient> 
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1
          }}
        />
      </View>
    );
  }
}

export default Explore;